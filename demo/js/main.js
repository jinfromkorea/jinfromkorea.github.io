// 
var yourId = Math.floor(Math.random()*1000000000);
var roomId;
document.getElementById('name').value = "guest-"+yourId;


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDKEYRybMQOAkpMZp2F3bTvQFboa2VJgrI",
    authDomain: "test-webrtc-56501.firebaseapp.com",
    databaseURL: "https://test-webrtc-56501.firebaseio.com",
    projectId: "test-webrtc-56501",
    storageBucket: "test-webrtc-56501.appspot.com",
    messagingSenderId: "1044697177062"
};
firebase.initializeApp(config);
console.log('[init] firebase.initializeApp()');

// firebase.database() 변수
var database4user = null;
var database4room = null;
//var database4conn = null;
var database4sdp = null;
var database4ice = null;

document.getElementById('startButton' ).onclick = button_onclick_start;
document.getElementById('hangupButton').onclick = button_onclick_hangup;

var pc; //RTCPeerConnection
var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');
var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, 
                              {'urls': 'stun:stun.l.google.com:19302'}, 
                              {'urls': 'turn:numb.viagenie.ca','credential': 'yujin','username': 'yujin@email.com'}]};

// https://www.w3schools.com/tags/av_event_loadedmetadata.asp 참고 
// loadstart -> durationchange -> loadedmetadata -> loadeddata -> progress -> canplay -> canplaythrough 순으로 event가 발생한다고 함. 
localVideo.addEventListener('loadedmetadata', function() {
    console.log('[loadedmetadata]Local video videoWidth: ' + this.videoWidth +'px,  videoHeight: ' + this.videoHeight + 'px');

    roomId = document.getElementById('room-id').value;
    database4user = firebase.database().ref(roomId+'/users');
    database4room = firebase.database().ref(roomId+'/info'); // once()에서 firebase.database.ref(...).set(...) 실행함. 
    //database4conn = firebase.database().ref(roomId+'/rtc');
    database4sdp  = firebase.database().ref(roomId+'/sdp');
    database4ice  = firebase.database().ref(roomId+'/ice');

    // https://firebase.google.com/docs/reference/js/firebase.database.Reference#once 참고. 
    // https://firebase.google.com/docs/reference/js/firebase.database.Reference#on 참고. 
    // on method에는 5가지 event가 사용 가능함. value, child_added, child_removed, child_changed, child_moved     
    database4room.once('value'      , database_rooms_once_value); // roomId별로 info에 count정보를 set() 하고 users에 sender 정보를 push()함
    //database4room.on('child_added'  , function(childSnapshot, prevChildKey){});
    //database4room.on('value'        , function(dataSnapshot){});
    //database4room.on('child_removed', function(oldChildSnapshot){});
    //database4room.on('child_changed', function(childSnapshot, prevChildKey){});
    //database4room.on('child_moved'  , function(childSnapshot, prevChildKey){});

    //database4user.on('child_added'  , function(childSnapshot, prevChildKey){});
    //database4user.on('value'        , function(dataSnapshot){});
    //database4user.on('child_removed', function(oldChildSnapshot){});
    //database4user.on('child_changed', function(childSnapshot, prevChildKey){});
    //database4user.on('child_moved'  , function(childSnapshot, prevChildKey){});

    database4ice.on('child_added'  , database_ice_on_child_added);
    database4sdp.on('child_added'  , database_sdp_on_child_added);
    //database4conn.on('child_added'  , database_signaling_on_child_added);
    //database4conn.on('value'        , function(dataSnapshot){});
    //database4conn.on('child_removed', function(oldChildSnapshot){});
    //database4conn.on('child_changed', function(childSnapshot, prevChildKey){});
    //database4conn.on('child_moved'  , function(childSnapshot, prevChildKey){});
});

/* 방에 입장할 경우 */
function button_onclick_start() {
    console.log('[click][start][1] change page ' + (new Date()) );
    document.getElementById('videos'        ).style.display = "block";
    document.getElementById('room-selection').style.display = "none";
    document.getElementById('startButton' ).disabled = true;
    document.getElementById('hangupButton').disabled = false;
    console.log('[click][start][1] change page .. end');

    console.log('[click][start][2] Requesting local stream');
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia 참고.
    // https://w3c.github.io/mediacapture-main/getusermedia.html 참고.
    navigator.mediaDevices.getUserMedia({audio:true, video:true}) // MediaStream 객체를 return함. 
    .then( stream => {
        console.log(stream);
        console.log('[click][start][2-1] getUserMedia() ');
        localStream = stream;
        localVideo.srcObject = stream; // localVideo.addEventListener('loadedmetadata', ..) 참고.
        console.log('[click][start][2-1] getUserMedia() .. end');
    })
    .catch( error => {
        console.log('    -> getUserMedia() error' + error.name);
        console.log(error);
    })
    //console.log('[click][start][2] Requesting local stream .. end');
}

function button_onclick_hangup() {
    database4room.once("value").then(function(dataSnapshot){
        console.log('[click][hangup][1] reduce count ' + (new Date()) );
        console.log( dataSnapshot.val().count );
        if ( dataSnapshot.val().count == 1 ){
            console.log(roomId);
            database4room.set(null);
            database4user.set(null);
            //firebase.database().ref(roomId).remove();
        }else{
            database4room.set({count:dataSnapshot.val().count-1});
        }
        console.log('[click][hangup][1] reduce count .. end' );
    })

    console.log('[click][hangup][2] detache callbacks');
    database4ice.off('child_added'  , database_ice_on_child_added);
    database4sdp.off('child_added'  , database_sdp_on_child_added);
    console.log('[click][hangup][2] detache callbacks .. end');

    document.getElementById("videos"        ).style.display = "none";
    document.getElementById("room-selection").style.display = "block";
    document.getElementById('startButton').disabled = false;
    roomId = null;
    console.log('Ending call');
    pc.close();
    //pc = null;
    document.getElementById('hangupButton').disabled = true;
    console.log('[click][hangup][n] .. end');
}

function database_rooms_once_value(dataSnapshot){
    console.log('[click][start][2-2] create RTCPeerConnection()');
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection 참고.
    pc = new RTCPeerConnection(servers);
    pc.onaddstream                = pc_onaddstream; //pc.setRemoteDescription() 이 불린 후에 MediaStreamEvent 가 발생함. 
    pc.onconnectionstatechange    = function(e){console.log(e);console.log('###[pc][onconnectionstatechange]')};
    pc.ondatachannel              = function(e){console.log(e);console.log('###[pc][ondatachannel]')};
    pc.onicecandidate             = pc_onicecandidate; // Local ICE agent가 signaling server를 통해 message를 deliver 해야할 경우 이벤트가 발생함. 
    pc.oniceconnectionstatechange = function(e){console.log(e);console.log('###[pc][oniceconnectionstatechange]')}; // pc.iceConnectionState 값이 바뀌는 경우.
    pc.onicegatheringstatechange  = function(e){console.log(e);console.log('###[pc][onicegatheringstatechange]')};
    pc.onidentityresult           = function(e){console.log(e);console.log('###[pc][onidentityresult]')};
    pc.onidpassertionerror        = function(e){console.log(e);console.log('###[pc][onidpassertionerror]')};
    pc.onidpvalidationerror       = function(e){console.log(e);console.log('###[pc][onidpvalidationerror]')};
    pc.onnegotiationneeded        = function(e){console.log(e);console.log('###[pc][onnegotiationneeded]')};
    pc.onpeeridentity             = function(e){console.log(e);console.log('###[pc][onpeeridentity]')};
    pc.onremovestream             = function(e){console.log(e);console.log('###[pc][onremovestream]')};;
    pc.onsignalingstatechange     = function(e){console.log(e);console.log('###[pc][onsignalingstatechange]')}; //pc.setLocalDescription() 이나 pc.setRemoteDescription() 이 불리면 signalingstatechange 이벤트가 발생됨.
    pc.ontrack                    = function(e){console.log(e);console.log('###[pc][ontrack]')};
    // pc의 event handler : onaddstream, ondatachannel, onicecandidate, oniceconnectionstatechange, onidentityresult, onidpassertionerror
    console.log('[click][start][2-2] create RTCPeerConnection() .. end ' + pc.signalingState + "/" + pc.iceConnectionState + "/" + pc.iceGatheringState);

    console.log('[click][start][2-3] addTrack');
    localStream.getTracks().forEach(function(track) { pc.addTrack(track, localStream); console.log(track); }); 
    // addTrack() 이 되면 negotiationneeded event가 발생하는 걸까?
    console.log('[click][start][2-3] addTrack .. end');

    database4user.push({sender:JSON.stringify(yourId)});
    if( dataSnapshot.val() != undefined ){
        database4room.set({count:dataSnapshot.val().count+1});
        console.log('##[database][once_value      ] modify');

        console.log('[click][start][2-4] createOffer ' + (new Date())); // db added 시점에 createOffer를 하는게 좋겠음. 
        pc.createOffer().then( (offer) => {
            console.log(offer); // RTCSessionDescription 
            console.log('[click][start][2-4] createOffer .. end');
            return pc.setLocalDescription(offer) ;
        }).then( () => {
            var msg = database4sdp.push({ sender:yourId, message:JSON.stringify({'sdp':pc.localDescription}) });
            msg.remove();                
        });//.catch();
    }else{
        database4room.set({count:1});
        console.log('##[database][once_value      ] new');
    }
}

function database_sdp_on_child_added ( childSnapshot, prevChildKey ){
    var sender = childSnapshot.val().sender;
    if (sender != yourId) {
        console.log('##[database][on_child_added  ] : [' + database4sdp.key + "]/" + childSnapshot.key + "/" + childSnapshot.val().sender + "/" + yourId);
        var msg = JSON.parse(childSnapshot.val().message);
        console.log(msg);
        if (msg.sdp.type == "offer") {
            console.log('[click][start][2-5] createAnswer ' + (new Date()));
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
            .then( () => pc.createAnswer() )
            .then( answer => pc.setLocalDescription(answer))
            .then( () => {
                var msg = database4sdp.push({ sender:yourId, message:JSON.stringify({'sdp':pc.localDescription}) });
                msg.remove();                
            });
            console.log('[click][start][2-5] createAnswer .. end');
        } else if (msg.sdp.type == "answer") {
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        }
        console.log('##[database][on_child_added  ] : [' + database4sdp.key + "]/" + childSnapshot.key + "/" + childSnapshot.val().sender + "/" + yourId + " .. end");
    }
}

function database_ice_on_child_added ( childSnapshot, prevChildKey ){
    var sender = childSnapshot.val().sender;
    if (sender != yourId) {
        console.log('##[database][on_child_added  ] : [' + database4ice.key + "]/" + childSnapshot.key + "/" + childSnapshot.val().sender + "/" + yourId);
        var msg = JSON.parse(childSnapshot.val().message);
        console.log(msg);
        pc.addIceCandidate(new RTCIceCandidate(msg.ice));
        console.log('##[database][on_child_added  ] : [' + database4ice.key + "]/" + childSnapshot.key + "/" + childSnapshot.val().sender + "/" + yourId + " .. end");
    }
}

function pc_onicecandidate(event) { 
    console.log(event);
    console.log('###[pc][onicecandidate] : ' + pc.signalingState + "/" + pc.iceConnectionState + "/" + pc.iceGatheringState + "/" + pc.localDescription.type + "/" + pc.remoteDescription.type);
    if ( event.candidate ) {
        var msg = database4ice.push({ sender: yourId, message: JSON.stringify({'ice': event.candidate}) });
        msg.remove();
    }else{
        console.log('###[pc][onicecandidate] : sent all ice ' + (new Date()));
    }
}
function pc_onaddstream(event){
    // pc.setRemoteDescription() 이 불리면.. 
    console.log(event); //MediaStreamEvent
    console.log('###[pc][onaddstream] : ' + pc.signalingState + "/" + pc.iceConnectionState + "/" + pc.iceGatheringState + "/" + pc.remoteDescription.type);
    remoteVideo.srcObject = event.stream;
}

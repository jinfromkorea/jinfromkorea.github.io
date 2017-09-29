// 
var yourId = Math.floor(Math.random()*1000000000);
var roomId;
var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, 
                              {'urls': 'stun:stun.l.google.com:19302'}, 
                              {'urls': 'turn:numb.viagenie.ca','credential': 'yujin','username': 'yujin@email.com'}]};
var cameraCnt = 0;
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
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('logon_email').innerHTML=user.email;
    // User is signed in.
    document.getElementById('login_page').style.display = "none";
    document.getElementById('room_page').style.display = "block";
    console.log(user)
  } else {
    document.getElementById('login_page').style.display = "block";
    // No user is signed in.
  }
});

navigator.mediaDevices.enumerateDevices().then( deviceInfos => { 
    deviceInfos.forEach( deviceInfo => { if(deviceInfo.kind=='videoinput'){cameraCnt++} } ); 
    console.log(deviceInfos);
} ).catch( error => console.log(error) );

var database4user = null; // firebase.database() 변수
var database4sdp = null;  // firebase.database() 변수
var database4ice = null;  // firebase.database() 변수
var pc; //RTCPeerConnection 변수
var dc; //RTCDataChannel 변수
var localStream = null;

document.getElementById('startButton' ).onclick = button_onclick_start;
document.getElementById('inviteButton').onclick = function(){console.log('not yet')};
document.getElementById('hangupButton').onclick = button_onclick_hangup;
document.getElementById('cameraButton').onclick = button_onclick_camera;
document.getElementById('textButton'  ).onclick = button_onclick_text;
document.getElementById('sendButton'  ).onclick = button_onclick_send;
document.getElementById('signup').onclick =  button_onclick_signup;
document.getElementById('signin').onclick =  button_onclick_signin;
document.getElementById('signout').onclick = button_onclick_signout;
document.getElementById('localVideo').onloadedmetadata =  video_onloadedmetadata_start_local;
document.getElementById('remoteVideo').onloadedmetadata = video_onloadedmetadata_start_remote;
window.onunload = function(){ console.log("[unload]where are you going?")};
window.onbeforeunload = button_onclick_hangup; //window.addEventListener('beforeunload', button_onclick_hangup); 와 같음. 

// https://www.w3schools.com/tags/av_event_loadedmetadata.asp 참고 
// loadstart -> durationchange -> loadedmetadata -> loadeddata -> progress -> canplay -> canplaythrough 순으로 event가 발생한다고 함. 


/* 방에 입장할 경우 */
function button_onclick_start() {
    console.log('[1][start] Check Room ' + (new Date()) );
    roomId = document.getElementById('room-id').value;
    document.querySelector('#roomInfo span').innerHTML = '방:'+roomId;
    document.querySelector("button#textButton").disabled = true;
    document.querySelector("button#fileButton").disabled = true;
    // https://firebase.google.com/docs/reference/js/firebase.database.Reference#once 참고. 
    // https://firebase.google.com/docs/reference/js/firebase.database.Reference#on 참고. 
    // on method에는 5가지 event가 사용 가능함. value, child_added, child_removed, child_changed, child_moved     
    // database4user.once('value'      , database_rooms_once_value);
    // database4user.on('child_added'  , function(childSnapshot, prevChildKey){});
    // database4user.on('value'        , function(dataSnapshot){});
    // database4user.on('child_removed', function(oldChildSnapshot){});
    // database4user.on('child_changed', function(childSnapshot, prevChildKey){});
    // database4user.on('child_moved'  , function(childSnapshot, prevChildKey){});
    database4user = firebase.database().ref(roomId+'/users');
    database4user.once('value').then(function(dataSnapshot){ //asnyc#1
        var cnt = 0;
        dataSnapshot.forEach( data => cnt++ );
        if( cnt < 2 ){
            database4user.push({ 
                sender:JSON.stringify(yourId), 
                url:window.location.href, 
                platform:navigator.platform, 
                userAgent:navigator.userAgent, 
                started:firebase.database.ServerValue.TIMESTAMP
            });
            database4user.on('child_removed', database_users_on_child_removed);
            console.log('[1][start] Check Room : ' + roomId + ' has ' + cnt + ' users');

            console.log('[2][start] Requesting local stream');
            document.getElementById('room_page').style.display = "none";
            document.getElementById('video_page').style.display = "block";
            document.getElementById('remoteVideo').style.display = "none";
            document.getElementById('inviteButton').style.display = "block";
            document.getElementById('hangupButton').style.display = "block";
            if( cameraCnt > 1 )
            document.getElementById('cameraButton').style.display = "block";
            // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia 참고.
            // https://w3c.github.io/mediacapture-main/getusermedia.html 참고.
            navigator.mediaDevices.getUserMedia({audio:true, video:true}) // MediaStream 객체를 return함. 
            .then( stream => {
                console.log(stream);
                localStream = stream;
                document.getElementById('localVideo').srcObject = stream; // localVideo.addEventListener('loadedmetadata', ..) 참고.
                console.log('[2][start] Requesting local stream .. end');
            }).catch( error => {
                console.log('[2][start] Requesting local stream .. error ' + error.name);
                console.log(error);
            })
        }else{
            alert("사용할 수 없는 방법호 입니다.");
            document.getElementById('room-id').focus();
        }
    });
}
function video_onloadedmetadata_start_local() {
    console.log('[loadedmetadata]Local video videoWidth: ' + this.videoWidth +'px,  videoHeight: ' + this.videoHeight + 'px');

    console.log('[3][start] Create a RTCPeerConnection and addTrack');
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection 참고.
    pc = new RTCPeerConnection(servers);
    dc = pc.createDataChannel("my channel");
    dc.onbufferedamountlow = function(e){console.log(e)};
    dc.onclose             = function(e){console.log(e)};
    dc.onerror             = function(e){console.log(e)};
    dc.onmessage           = function(e){console.log(e)};
    dc.onopen              = function(e){console.log(e)};
    pc.onaddstream                = pc_onaddstream; //pc.setRemoteDescription() 이 불린 후에 MediaStreamEvent 가 발생함. 
    pc.onconnectionstatechange    = function(e){console.log(e);};//console.log('###[pc][onconnectionstatechange]')
    pc.ondatachannel              = function(e){console.log(e);};//console.log('###[pc][ondatachannel]')
    pc.onicecandidate             = pc_onicecandidate; // Local ICE agent가 signaling server를 통해 message를 deliver 해야할 경우 이벤트가 발생함. 
    pc.oniceconnectionstatechange = function(e){console.log(e);};//console.log('###[pc][oniceconnectionstatechange]')
    // pc.iceConnectionState 값이 바뀌는 경우.
    pc.onicegatheringstatechange  = function(e){console.log(e);};//console.log('###[pc][onicegatheringstatechange]')
    pc.onidentityresult           = function(e){console.log(e);};//console.log('###[pc][onidentityresult]')
    pc.onidpassertionerror        = function(e){console.log(e);};//console.log('###[pc][onidpassertionerror]')
    pc.onidpvalidationerror       = function(e){console.log(e);};//console.log('###[pc][onidpvalidationerror]')
    pc.onnegotiationneeded        = function(e){console.log(e);};//console.log('###[pc][onnegotiationneeded] ' + (new Date()) )
    pc.onpeeridentity             = function(e){console.log(e);};//console.log('###[pc][onpeeridentity]')
    pc.onremovestream             = function(e){console.log(e);};//console.log('###[pc][onremovestream]')
    pc.onsignalingstatechange     = function(e){console.log(e);}; //console.log('###[pc][onsignalingstatechange]')
    //pc.setLocalDescription() 이나 pc.setRemoteDescription() 이 불리면 signalingstatechange 이벤트가 발생됨.
    pc.ontrack                    = function(e){console.log('track');console.log(e);};//console.log('###[pc][ontrack]')

    localStream.getTracks().forEach( track => { pc.addTrack(track, localStream); console.log(track) } ); 
    // addTrack() 이 되면 negotiationneeded event가 발생하는 걸까?
    console.log('[3][start] Create a RTCPeerConnection and addTrack .. end');

    database4sdp = firebase.database().ref(roomId+'/sdp');
    database4sdp.on('child_added'  , database_sdp_on_child_added);
    database4ice = firebase.database().ref(roomId+'/ice');
    database4ice.on('child_added'  , database_ice_on_child_added);

    database4user.once('value').then(function(dataSnapshot){
        var cnt = 0;
        dataSnapshot.forEach( data => cnt++ );
        if( cnt == 2 ){
            console.log('[4][start] createOffer, setLocalDescription ' + (new Date())); // db added 시점에 createOffer를 하는게 좋겠음. 
            pc.createOffer().then( (offer) => {
                console.log(offer); // RTCSessionDescription 
                return pc.setLocalDescription(offer); // --> signalingstatechange 발생.
            }).then( () => {
                var msg = database4sdp.push({ sender:yourId, message:JSON.stringify({'sdp':pc.localDescription}) });
                msg.remove();
                //console.log(pc);
                console.log('[4][start] createOffer, setLocalDescription .. end');
            });
        }
    });
};
function video_onloadedmetadata_start_remote() {
    console.log('[loadedmetadata]Remote video videoWidth: ' + this.videoWidth +'px,  videoHeight: ' + this.videoHeight + 'px')
};

function button_onclick_hangup() {
    console.log('[가][hangup] Close RTCPeerConnection : ' + (new Date()) );
    if(pc!=null && pc.signalingState!="closed"){
        console.log('[가][hangup] ' + pc.signalingState );
        pc.close(); 
    }
    console.log('[가][hangup] Close RTCPeerConnection : ');
    firebase.database().ref(".info/connected").on("value", function(snapshot) {
        if( snapshot.val() === true ){
            database4user.off('child_removed', database_users_on_child_removed);
            database4user.once("value").then(function(dataSnapshot){
                console.log('[나][hangup] Delete user ');
                dataSnapshot.forEach( data => {
                    if( yourId == data.val().sender){
                        firebase.database().ref(roomId+"/users/"+data.key).set(null);
                        roomId = null;
                    }
                })
                console.log('[나][hangup] Delete user .. end');
            });
            database4ice.off('child_added'  , database_ice_on_child_added);
            database4sdp.off('child_added'  , database_sdp_on_child_added);
        }
    });

    document.getElementById('room_page').style.display = "block";
    document.getElementById('video_page').style.display = "none";
    document.getElementById('localVideo'    ).style = "display:block;"; // 원래대로. 
}
function button_onclick_camera(){
    if ( document.getElementById('cameraButton').getElementsByTagName('i').innerHTML == 'camera_front')
        document.getElementById('cameraButton').getElementsByTagName('i').innerHTML = 'camera_rear';
    else
        document.getElementById('cameraButton').getElementsByTagName('i').innerHTML = 'camera_front';    
}

function database_users_on_child_removed(oldChildSnapshot){
    if ( yourId != oldChildSnapshot.val().sender ){
        console.log('[라][hangup] Catched');
        document.getElementById('localVideo'    ).style = "display:block;"; // 원래대로. 
        document.getElementById('remoteVideo'   ).style = "display:none";
        document.getElementById('inviteButton').style.display = "none";
        document.getElementById('hangupButton').style.display = "block";
        document.querySelector("button#textButton").disabled = true;
        document.querySelector("button#fileButton").disabled = true;
        console.log('[라][hangup] Catched .. end');
    }
}
function database_sdp_on_child_added ( childSnapshot, prevChildKey ){
    var sender = childSnapshot.val().sender;
    var msg = JSON.parse(childSnapshot.val().message);
    if (sender != yourId ) {
        if (msg.sdp.type == "offer") {
            console.log('[5][start] setRemoteDescription, createAnswer, setLocalDescription ' + (new Date()));
            console.log(msg);
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
            .then( () => pc.createAnswer() )
            .then( answer => pc.setLocalDescription(answer))
            .then( () => {
                var msg = database4sdp.push({ sender:yourId, message:JSON.stringify({'sdp':pc.localDescription}) });
                msg.remove();                
            });
            console.log('[5][start] setRemoteDescription, createAnswer, setLocalDescription .. end');
        } else if (msg.sdp.type == "answer") {
            console.log('[5][start] setRemoteDescription ' + (new Date()));
            console.log(msg);
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            console.log('[5][start] setRemoteDescription .. end');
        }
    }
    document.querySelector("button#textButton").disabled = false;
    document.querySelector("button#fileButton").disabled = false;
}

function database_ice_on_child_added ( childSnapshot, prevChildKey ){
    var sender = childSnapshot.val().sender;
    if (sender != yourId) {
        console.log('[6][start] addIceCandidate ' + childSnapshot.val().sender + "/" + yourId);
        var msg = JSON.parse(childSnapshot.val().message);
        console.log(msg);
        pc.addIceCandidate(new RTCIceCandidate(msg.ice));
        console.log('[6][start] addIceCandidate ' + childSnapshot.val().sender + "/" + yourId + ' .. end');
    }
}

function pc_onicecandidate(event) { 
    console.log(event);
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
    document.getElementById('remoteVideo').srcObject = event.stream;
    document.getElementById('remoteVideo').style = "display:block;";
    document.getElementById('localVideo' ).style = "display:block; width:20%;position:absolute;left:20px;top:20px;";
    document.getElementById('inviteButton').disabled = false;
}

function button_onclick_signup(){
    email = document.getElementById('signup_email').value;
    password = document.getElementById('singup_password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then( () => {document.getElementById('signup_page').style.display = "none";}).catch(error => {console.log(error);alert(error.message)});
}
function button_onclick_signin(){
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        console.log(error);alert(error.message);
        if(error.code=='auth/user-not-found'){
            document.getElementById('signup_page').style.display = "block";
            document.getElementById('login_page').style.display = "none";
            document.getElementById('signup_email').value = document.getElementById('email').value;
        }
    });
}
function button_onclick_signout(){
    document.getElementById('room_page').style.display = "none";
    firebase.auth().signOut().then( () => console.log("sign out") ).catch(error=> console.log(error));
}
function button_onclick_text(){
    document.getElementById('dataChannelSend').disabled = false;
}
function button_onclick_send(){
    console.log('send button clicked');
}
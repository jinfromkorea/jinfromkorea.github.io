---
layout: post
title: "auth"
date: 2017-09-27
category: firebase
---

```
<div id="logon" class="hidden">
  <button id="signout">signout</button>
</div>
<div id="logoff" class="hidden">
  <input type="text" id="email">
  <input type="password" id="password">
  <button id="signup">signup</button>
  <button id="signin">signin</button>
</div>
```


```
<script src="https://www.gstatic.com/firebasejs/4.4.0/firebase.js"></script>
<script>
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
</script>
```


```
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById('logoff').style.display = "none";
    document.getElementById('logon').style.display = "block";
    console.log(user)
  } else {
    document.getElementById('logoff').style.display = "block";
    document.getElementById('logon').style.display = "none";
    // No user is signed in.
  }
});
```


```
document.getElementById('signup').onclick = function(){
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {console.log(error);alert(error.message)});
};

document.getElementById('signin').onclick =  function(){
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {console.log(error);alert(error.message)});
};

document.getElementById('signout').onclick = function(){
    firebase.auth().signOut().then( () => console.log("sign out") )
    .catch(error=> console.log(error));
};
```
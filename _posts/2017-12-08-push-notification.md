---
layout: post
title: "push notification"
date: 2017-12-08
category: api
---

일단 다음 사이트 참고 했음.  
https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications-slides  
https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications  
https://developers.google.com/web/ilt/pwa/lab-integrating-web-push  

codelab에서 받은 github 소스에서 pwa-training-labs/push-notification-lab/app 위치로 이동해서 따라 하면 됨. 
```
iMac2008ui-iMac:pwa-training-labs poscoict$ pwd
/Users/poscoict/Documents/GitHub/pwa-training-labs
iMac2008ui-iMac:pwa-training-labs poscoict$ cd push-notification-lab/app/
iMac2008ui-iMac:app poscoict$ 
```

`web-push` 모듈을 설치하고.. `npm install web-push -g`으로 web-push를 설치하려 했더니, 에러(permission denied)가 보임. `sudo`를 같이 쓰니 해결됨.  
모듈 설치중 npm update 가능 여부도 알려준다. 
```
iMac2008ui-iMac:app poscoict$ npm install
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN push-notification-codelab@1.0.0 No description
npm WARN push-notification-codelab@1.0.0 No repository field.

added 14 packages in 3.669s
iMac2008ui-iMac:app poscoict$ sudo npm install web-push -g
Password:
/usr/local/bin/web-push -> /usr/local/lib/node_modules/web-push/src/cli.js
+ web-push@3.2.5
updated 1 package in 3.014s


   ╭─────────────────────────────────────╮
   │                                     │
   │   Update available 5.5.1 → 5.6.0    │
   │     Run npm i -g npm to update      │
   │                                     │
   ╰─────────────────────────────────────╯

iMac2008ui-iMac:app poscoict$ 
```

Push Notifications는 2개의 API로 구성되어 있고, Notification API와 Push API를 말한다. 

# Notification API

사용자에게 notification을 보여주는 API이고, 
브라우저에서 지원하지 않을 수 있으므로, 체크해주는 것이 좋다. 
브라우저에서 지원하면 퍼미션이 어떤지 살펴봐야 한다. `denied`와 `granted` 중에 하나인 듯 하다. 
```
// 1. 브라우저 지원여부 확인
if (!('Notification' in window)){
    console.log('브라우저가 지원하지 않아요. ');
    return; 
}
// 2. 퍼미션 확인
Notification.requestPermission(function(status){
    console.log('퍼미션 : ', status);
})
```

일단은 알림 확인 버튼에 이벤트를 단다고 가장하고. 

```
var notifyButton = document.querySelector('.js-notify-btn');
notifyButton.addEventListener('click', function() {
    displayNotification();
});
function displayNotification() {
    // 3. 보이기
    if(Notification.permission == 'granted'){
        navigator.serviceWorker.getRegistration().then(function(registration) {
            console.log(registration);
            // 4. options 구성
            var options = {
                body : 'First notification',
                icon : 'images/notification-flat.png',
                vibrate : [100, 50, 100],
                data : {
                    dataOfArrival : Date.now(),
                    primaryKey : 1
                },
                // 4. actions
                actions : [
                    {action:'explore', title:'Go to the site', icon:'images/checkmark.png'},
                    {action:'close', title:'Close the notification', icon:'images/xmark.png'}
                ]
            };
            registration.showNotification('Hello World', options);
        })
    }
}
```

service workder 에 eventListener를 달아줘야하고.. 
```
self.addEventListener('notificationclose', function(e){
    console.log(e);
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification: ', primaryKey);
});

self.addEventListener('notificationclick', function(e){
    console.log(e);
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;
    if( action === 'close'){
        notification.close();
    }else{
        clients.openWindow('samples/page'+primaryKey+'.html');
        notification.close();
    }
});
```


curl "https://android.googleapis.com/gcm/send/eatuMYeZah8:APA91bEUm1cUxR_x4ihG_SPWO3qR14tvNEq9XUWhzZJ5W-QOgGj9GqvHiyezMqnEW9VtAeuuFb5T2481ToYOeTykMFaXznkCUQup1l3IKuCYSOl6ImWcNAHGsprIVJeMohn6DnVgq4Ll" --request POST --header "TTL: 60" --header "Content-Length: 0" --header "Authorization: key=AAAA_ZdkGss:APA91bEzZksdEFqcklbFeR2o1WfnOpuSPFE8OhSFJApO_DZ19PQtiTj7DrU6xUVP3vhV1TIvqQln0xhDWKJh2Ej436ut4FAXpgGsAbbjTbTLyH_EDc3GyqhJoi8FEtYxq_dB19huS3DC"
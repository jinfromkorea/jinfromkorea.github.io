---
layout: page
---

firebase 

# firebase Hosting

## Nodejs
nodejs 설치 여부는 버전 확인해보면 됨.  
nodejs를 설치하면 npm이 같이 설치됨.  
```
node -v
npm -v
```

## Firebase Cli
-g 옵션으로 globally하게 사용가능 하게 된 것임.  
permission 어쩌고 error가 나면 sudo 와 같이 실행하면 될 것임.  
최신버전으로 update하고자 할때도 같은 명령어임.  
```
npm install -g firebase-tools
firebase init   #firebase.json 파일이 생성됨. 
firebase serve  #개발서버 시작
```

`firebase init` 실행시 `Error: Command requires authentication, please run firebase login` 메시지가 보인다면. `firebase login` 을 실행해줘야 한다.  
>firebase login  실행해서 google 계정으로 로그인하면 됨. 


### 결과

다음은 mac 에서 개발서버를 띄워본거임.  
일단 firebase cli 설치.. 

```
iMac2008ui-iMac:test poscoict$ sudo npm install -g firebase-tools
Password:
npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
/usr/local/bin/firebase -> /usr/local/lib/node_modules/firebase-tools/bin/firebase
+ firebase-tools@3.16.0
updated 1 package in 34.939s
iMac2008ui-iMac:test poscoict$ firebase init

     🔥🔥🔥🔥🔥🔥🔥🔥 🔥🔥🔥🔥 🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥 🔥🔥🔥🔥🔥🔥🔥🔥     🔥🔥🔥     🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥
     🔥🔥        🔥🔥  🔥🔥     🔥🔥 🔥🔥       🔥🔥     🔥🔥  🔥🔥   🔥🔥  🔥🔥       🔥🔥
     🔥🔥🔥🔥🔥🔥    🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥   🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥
     🔥🔥        🔥🔥  🔥🔥    🔥🔥  🔥🔥       🔥🔥     🔥🔥 🔥🔥     🔥🔥       🔥🔥 🔥🔥
     🔥🔥       🔥🔥🔥🔥 🔥🔥     🔥🔥 🔥🔥🔥🔥🔥🔥🔥🔥 🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥     🔥🔥  🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥

You're about to initialize a Firebase project in this directory:

  /Users/poscoict/Documents/test

? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices. (Press  to select)
    ❯◯ Database: Deploy Firebase Realtime Database Rules
     ◯ Firestore: Deploy rules and create indexes for Firestore
     ◯ Functions: Configure and deploy Cloud Functions
     ◯ Hosting: Configure and deploy Firebase Hosting sites
     ◯ Storage: Deploy Cloud Storage security rules
```

5가지를 다 선택할수도 있겠으나, 일단은 Hosting만 선택해서.. 진행했음. 

```
? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices. Hosting: Configure and deploy Fir
ebase Hosting sites

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

i  .firebaserc already has a default project, skipping

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
✔  Wrote public/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
iMac2008ui-iMac:test poscoict$ 
```

어떤 파일이 생성되었는지 확인좀 해보고.. 
```
iMac2008ui-iMac:test poscoict$ ls
firebase.json	public
iMac2008ui-iMac:test poscoict$ cat firebase.json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
iMac2008ui-iMac:test poscoict$ 
```

서버를 띄워본다.  
```
iMac2008ui-iMac:test poscoict$ firebase serve

=== Serving from '/Users/poscoict/Documents/test'...

i  hosting: Serving hosting files from: public
✔  hosting: Local server: http://localhost:5000

127.0.0.1 - - [11/Dec/2017:08:18:10 +0000] "GET / HTTP/1.1" 200 3505 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
127.0.0.1 - - [11/Dec/2017:08:18:10 +0000] "GET /__/firebase/init.js HTTP/1.1" 200 - "http://localhost:5000/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
127.0.0.1 - - [11/Dec/2017:08:21:10 +0000] "GET /test.html HTTP/1.1" 200 5 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
```

`--help' 를 옵션 확인해서..  host 정보 바꿔도 됨.

```
iMac2008ui-iMac:test poscoict$ firebase serve --help

  Usage: serve [options]

  start a local server for your static assets


  Options:

    -p, --port    the port on which to listen (default: 5000) (default: 5000)
    -o, --host    the host on which to listen (default: localhost) (default: localhost)
    --only     only serve specified targets (valid targets are: functions, hosting)
    --except   serve all except specified targets (valid targets are: functions, hosting)
    -h, --help          output usage information
iMac2008ui-iMac:test poscoict$ firebase serve -o 192.168.247.246

=== Serving from '/Users/poscoict/Documents/test'...

i  hosting: Serving hosting files from: public
✔  hosting: Local server: http://192.168.247.246:5000
```

public 폴더에 test.html 을 추가하고 테스트 해보면.. 이것 역시 서비스가 됨. 
```
iMac2008ui-iMac:test poscoict$ ls -alt
total 16
drwxr-xr-x  3 poscoict  staff  170 Dec 11 17:42 .
-rw-r--r--  1 poscoict  staff   59 Dec 11 17:29 .firebaserc
-rw-r--r--  1 poscoict  staff  236 Dec 11 17:29 firebase.json
drwxr-xr-x  2 poscoict  staff  136 Dec 11 17:20 public
drwx------+ 4 poscoict  staff  204 Dec  8 14:21 ..
iMac2008ui-iMac:test poscoict$ ls -alt public
total 24
drwxr-xr-x  3 poscoict  staff   170 Dec 11 17:42 ..
-rw-r--r--  1 poscoict  staff  4806 Dec 11 17:37 test.html
-rw-r--r--  1 poscoict  staff  3505 Dec 11 17:29 index.html
drwxr-xr-x  2 poscoict  staff   136 Dec 11 17:20 .
iMac2008ui-iMac:test poscoict$ 
```    


deploy 도 그냥 되는듯.  
local 일경우에는 http 였는데.  
deploy가 되니까 https로 URL의 변화가 보인다.   
```
iMac2008ui-iMac:test poscoict$ firebase deploy

=== Deploying to 'test-webrtc-56501'...

i  deploying hosting
i  hosting: preparing public directory for upload...
✔  hosting: 2 files uploaded successfully

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/test-webrtc-56501/overview
Hosting URL: https://test-webrtc-56501.firebaseapp.com
iMac2008ui-iMac:test poscoict$ 
```

그래서..  
github page로 올려두 되고.  
firbase hosting 으로 올려두 될듯 하다.  
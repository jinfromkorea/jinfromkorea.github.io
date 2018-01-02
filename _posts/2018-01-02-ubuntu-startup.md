---
layout: post
title: "startup app 등록하기"
date: 2018-01-02
category: os
---

desktop app을 만들어서 실행하려면. `npm start` 명령어가 실행되고..  
내부적으로 `electron .` 이 실행됨(package.json참고).
```
jinia@jin:~/Documents/GitHub/first$ npm start

> startup@1.0.0 start /home/jinia/Documents/GitHub/first
> electron .

```

electron으로 만든 desktop app을 Ubuntu에서 시작프로그램으로 등록하려면.. 
아래와 같이 하면 되는듯.

startup applications preference 창을 열어서  
-> Add 버튼 클릭  
-> Add Startup Program창에서 다음 3가지 값을 입력
   * Name : wearable startup
   * Command : /usr/local/bin/electron /home/jinia/Documents/GitHub/first/
   * Comment : Wearable Startup App  

-> Add Startup Program창에서 Add 버튼 클릭  
-> Close 버튼 클릭  
-> reboot 해서 확인  

electron은 global로 설치되어 있고..  실행하고자 하는 app 의 위치를 주면 되는듯. 

`electron .` 으로 app을 실행하므로..  

참고 [https://itsfoss.com/manage-startup-applications-ubuntu/](https://itsfoss.com/manage-startup-applications-ubuntu/)
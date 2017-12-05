---
layout: post
title: "visual studio code"
date: 2017-12-04
category: tools
---

text editor 임.  
https://code.visualstudio.com 에서 다운로드 받으면 됨.  
LG노트북에는 윈도우용으로 설치했고. iMac에는 맥용으로 프로그램 설치했음.  

GitHub Desktop으로 다운받은 소스를 폴더채로 열어서 작업영역(workspace)잡아서 텍스트파일 수정 하면 되는듯. 

윈도우에서는 Ctrl+Shipt+P 를 누르면 Command Pallete가 나타난다.  
맥에서는 Command+Shipt+P 를 누르면 나타난다. 


Node.js설치. 8.9.1LTS 버전 받아 iMac에 설치함.  
```
/usr/local/bin/node ( Node.js v8.9.1 )
/usr/local/bin/npm ( npm v5.5.1 )
```
iMac에서 터미널 실행해서.. 버전 체크해서... node 설치 여부를 확인했음. 
```
iMac2008ui-iMac:~ poscoict$ pwd
/Users/poscoict
iMac2008ui-iMac:~ poscoict$ node --version
v8.9.1
iMac2008ui-iMac:~ poscoict$ 
```

Visual Studio Code(VS Code)로 돌아와서..  메뉴 > 보기 > 통합터미널 실행하면 터미널로 전환할 필요없이 VS Code에서 node를 실행할 수 있다. 
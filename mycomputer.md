`---
layout: page
title: my computers
permalink: /about/
---

* [Windows 7 Enterprise K (32 bit) : VDI](#window)
* [OS X El Capitan : iMac(24-inch, Early 2008)](#mac)
* [Ubuntu 17.10 : LG 15UB470](#linux)

## linux

```bash
cd ~;~/Desktop/android-studio/bin/studio.sh &
cd ~;~/Desktop/eclipse/eclipse &
cd ~/Desktop/apache-tomcat-7.0.85/bin/;~/Desktop/apache-tomcat-7.0.85/bin/startup.sh
cd ~/Documents/GitHub/jinfromkorea.github.io/;bundle exec jekyll serve
```

## window

## mac



[Chrome](./mycomputer.html#chrome)  
[java](./mycomputer.html#java)  

[프로그램 실행](./mycomputer.html#run)



## [chrome]

특이사항 없음.

## [java]

>
 * Java  

> C:\Android\jdk1.8.0_144

 * Tomcat  
 Binary Distributions의 zip 형태의 Core 를 사용했고 설치경로는 다음과 같음.   
 설치폴더/bin/setclasspath.bat 에 JAVA_HOME 을 추가해서 사용함.

> C:\Android\apache-tomcat-8.5.16

 * Visual Studio Code

 * Git

 * GitHub Desktop

 * Node.js

 * Ruby

 * Docker



***

### 설치가 끝이 아니다. 


C:\Users\hwangyujin\AppData\Roaming\npm;  
C:\Users\hwangyujin\AppData\Local\GitHubDesktop\bin  
C:\Ruby24-x64\bin;  
C:\ProgramData\Oracle\Java\javapath;  
C:\Program Files (x86)\AMD APP\bin\x86_64;  
C:\Program Files (x86)\AMD APP\bin\x86;  
C:\Program Files (x86)\Intel\iCLS Client\;  
C:\Program Files\Intel\iCLS Client\;  
C:\Windows\system32;  
C:\Windows;  
C:\Windows\System32\Wbem;  
C:\Windows\System32\WindowsPowerShell\v1.0\;  
C:\Program Files\Intel\Intel(R) Management Engine Components\DAL;  
C:\Program Files\Intel\Intel(R) Management Engine Components\IPT;  
C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\DAL;  
C:\Program Files (x86)\Intel\Intel(R) Management Engine Components\IPT;  
C:\Program Files (x86)\ATI Technologies\ATI.ACE\Core-Static;  
C:\Raycloud;  
C:\Program Files\nodejs\;  
C:\Program Files\Git\cmd  

1. 인증서 : POSCOICT_CA_256.cer 

   C:\Android\jdk1.8.0_144\jre\lib\security\ 위치에 cacerts 파일이 있음. 

   C:\Android\jdk1.8.0_144\jre\lib\security\ 위치에 POSCOICT_CA_256.cer 파일을 추가함. 


```
set JAVA_HOME=C:\Android\apache-tomcat-8.5.16
cd %JAVA_HOME%/jre/lib/security
%JAVA_HOME%/bin/keytool -import -keystore cacerts -storepass changeit -file POSCOICT_CA_256.cer -alias poscoict
```


4. Tomcat SSL

   C:\Android\apache-tomcat-8.5.16 위치에 yujin_tomcat.keystore 파일을 생성함.

```
set JAVA_HOME=C:\Android\apache-tomcat-8.5.16
set CATALINA_BASE=C:\Android\apache-tomcat-8.5.16
cd %CATALINA_BASE%
%JAVA_HOME%/bin/keytool -genkey  -alias yujin_tomcat -keyalg RSA -keysize 2048 -keystore yujin_tomcat.keystore
%JAVA_HOME%/bin/keytool -certreq -alias yujin_tomcat -file yujin_tomcat.csr    -keystore yujin_tomcat.keystore
```

   C:\Android\apache-tomcat-8.5.16\conf 위치의 server.xml 을 수정함. 

```
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
<Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
           maxThreads="150" SSLEnabled="true">
    <SSLHostConfig>
        <Certificate certificateKeystoreFile="C:/Android/apache-tomcat-8.5.16/yujin_tomcat.keystore"
                     type="RSA" />
    </SSLHostConfig>
</Connector>
```

    C:\Android\apache-tomcat-8.5.16\bin\startup.bat 을 실행하면.  다음과 같은 로그 확인가능. 

```
[main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
[main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["https-jsse-nio-8443"]
[main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
[main] org.apache.catalina.startup.Catalina.start Server startup in 5865 ms
```

5. webrtc 예제 추가

    https://github.com/webrtc/samples/ 를 clone 


https://websitebeaver.com/insanely-simple-webrtc-video-chat-using-firebase-with-codepen-demo




https://yujin.poscoict.co.kr:8443/webrtc/codelab/index.html
https://www.solutionpot.co.kr/doc/test/
https://yujin.poscoict.co.kr:8443/demo/index.html


###[pc][onnegotiationneeded] : stable/new/new/
###[pc][onsignalingstatechange] : have-local-offer/new/gathering/
###[pc][onicegatheringstatechange] : have-local-offer/new/gathering/
###[pc][onicecandidate] : have-local-offer/new/gathering/
###[pc][onicegatheringstatechange] : have-local-offer/new/complete/




1. keystore 생성
C:\Android\jdk1.8.0_144\bin\keytool -genkey -alias yujin_tomcat -keyalg RSA -keysize 2048 -keystore  yujin_tomcat.keystore
2. CSR 생성
C:\Android\jdk1.8.0_144\bin\keytool -certreq -alias yujin_tomcat -file yujin_tomcat.csr -keystore yujin_tomcat.keystore
3. SSL 인증서 발급

```
C:\Android\jdk1.8.0_144\bin\keytool -import -trustcacerts -alias yujin_tomcat -file yujin_tomcat.cert -keystore yujin_tomcat.keystore
```

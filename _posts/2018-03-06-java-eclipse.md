---
layout: post
title: "install java & eclipse on ubuntu 17.10"
date: 2018-03-06
category: java
---

참고 사이트 

 * [https://linuxhint.com/install-oracle-jdk9-ubuntu/](https://linuxhint.com/install-oracle-jdk9-ubuntu/) Java
 * [http://avengerhdd.tistory.com/22](http://avengerhdd.tistory.com/22) Eclipse
 * [https://memnoth.github.io/2017/11/how-to-solve-the-problem-of-freezing-of-eclipse-in-linux/](https://memnoth.github.io/2017/11/how-to-solve-the-problem-of-freezing-of-eclipse-in-linux/) Gtk

# Java

Oracle 사이트에서 Java SE 를 Download 함. 일단 2개 받았음. 

* jdk-8u162-linux-x64.tar.gz
* jdk-9.0.4_linux-x64_bin.tar.gz

  다음 명령어로 java를 설치했음. 
```
tar xvzf jdk-9.0.4_linux-x64_bin.tar.gz -C ~/Desktop
tar xvzf jdk-8u162-linux-x64.tar.gz -C ~/Desktop
```
  Java Path를 잡지 않았으므로 다음과 같이 버전 확인 가능함. 
```bash
jinia@jin:~$ ~/Desktop/jdk-9.0.4/bin/java -version
java version "9.0.4"
Java(TM) SE Runtime Environment (build 9.0.4+11)
Java HotSpot(TM) 64-Bit Server VM (build 9.0.4+11, mixed mode)
jinia@jin:~$ ~/Desktop/jdk1.8.0_162/bin/java -version
java version "1.8.0_162"
Java(TM) SE Runtime Environment (build 1.8.0_162-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.162-b12, mixed mode)
jinia@jin:~$ 
```

## Java Path 잡기

첫번째 참고 사이트 참고해서 /etc/bash.bashrc 파일의 맨 밑에 JAVA_HOME 과 PATH 를 추가한다. 

```
export JAVA_HOME=/home/jinia/Desktop/jdk-9.0.4
export PATH=$PATH:${JAVA_HOME}/bin
```

수정후 다음과 같이 수정결과를 확인하고, 재부팅한다. 

```bash
jinia@jin:~$ cat /etc/bash.bashrc 
# System-wide .bashrc file for interactive bash(1) shells.

... 중략 ...

export JAVA_HOME=/home/jinia/Desktop/jdk-9.0.4
export PATH=$PATH:${JAVA_HOME}/bin
jinia@jin:~$ 
```

재부팅 후에, java 경로 없이 실행됨을 확인할 수 있다. 

```bash
jinia@jin:~$ java -version
java version "9.0.4"
Java(TM) SE Runtime Environment (build 9.0.4+11)
Java HotSpot(TM) 64-Bit Server VM (build 9.0.4+11, mixed mode)
jinia@jin:~$ whereis java
java: /usr/share/java /home/jinia/Desktop/jdk-9.0.4/bin/java
jinia@jin:~$ 
```

# eclipse

두번째 사이트 참고해서.. Eclipse IDE for Java EE Developers 패키지를 다운받아 압축을 푼다. 

```
tar xvzf eclipse-jee-oxygen-2-linux-gtk-x86_64.tar.gz -C ~/Desktop
```

~/Desktop 의 위치에 eclipse와 java가 설치되어 있음을 확인할 수 있고, 
~/Desktop/eclipse/eclipse 를 실행하면 된다. 

```bash
jinia@jin:~$ ll ~/Desktop/
total 24
drwxr-xr-x  6 jinia jinia 4096 Mar  7 10:29 ./
drwxr-xr-x 45 jinia jinia 4096 Mar  7 10:30 ../
drwxrwxr-x  8 jinia jinia 4096 Nov 10 11:51 android-studio/
drwxr-xr-x  8 jinia jinia 4096 Mar  7 10:30 eclipse/
drwxr-xr-x  8 jinia jinia 4096 Dec 20 14:27 jdk1.8.0_162/
drwxr-xr-x  8 jinia jinia 4096 Mar  7 09:26 jdk-9.0.4/
jinia@jin:~$ 
jinia@jin:~$ ~/Desktop/eclipse/eclipse 
WARNING: Using incubator modules: jdk.incubator.httpclient
org.eclipse.m2e.logback.configuration: The org.eclipse.m2e.logback.configuration bundle was activated before the state location was initialized.  Will retry after the state location is initialized.

```

workspace는 default로 사용하겠음. ( /home/jinia/eclipse-workspace ) 

참고 사이트에는 X-윈도우에서의 바로가기 만들기도 있으나. 내꺼는 GNOME 이니... 여기까지만.. 


## 인증서 추가하기

java 9 에 추가 

```bash
jinia@jin:~$ ls /usr/share/ca-certificates/extra/
POSCOICT_CA_256.crt
jinia@jin:~$ ls ~/Desktop/jdk-9.0.4/lib/security
blacklist  blacklisted.certs  cacerts  default.policy  public_suffix_list.dat  trusted.libraries
jinia@jin:~$ cp /usr/share/ca-certificates/extra/POSCOICT_CA_256.crt ~/Desktop/jdk-9.0.4/lib/security/
jinia@jin:~$ ls ~/Desktop/jdk-9.0.4/lib/security
blacklist  blacklisted.certs  cacerts  default.policy  POSCOICT_CA_256.crt  public_suffix_list.dat  trusted.libraries
jinia@jin:~$ cd ~/Desktop/jdk-9.0.4/lib/security
jinia@jin:~/Desktop/jdk-9.0.4/lib/security$ keytool -import -keystore cacerts -storepass changeit -file POSCOICT_CA_256.crt -alias poscoict
Warning: use -cacerts option to access cacerts keystore
Owner: EMAILADDRESS=admin@poscoict.co.kr, CN=POSCOICT_CA_256, OU=secuirty, O=POSCOICT_CA_256, L=SEOUL, ST=CA, C=KR
Issuer: EMAILADDRESS=admin@poscoict.co.kr, CN=POSCOICT_CA_256, OU=secuirty, O=POSCOICT_CA_256, L=SEOUL, ST=CA, C=KR
Serial number: e820fa5b1697e9ab
Valid from: Fri Jan 08 11:17:12 KST 2016 until: Mon Jan 05 11:17:12 KST 2026
Certificate fingerprints:
	 SHA1: A3:28:D6:5A:2A:F0:AF:A5:A1:93:1D:A2:A8:63:E3:96:E6:AB:FE:34
	 SHA256: FB:E1:23:49:B0:E9:D8:AD:F7:07:7F:A2:DD:18:DB:C2:C7:B2:8E:D9:03:E4:1B:AB:23:B0:57:BE:DA:98:89:9A
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 1024-bit RSA key
Version: 3

Extensions: 

#1: ObjectId: 2.5.29.35 Criticality=false
AuthorityKeyIdentifier [
KeyIdentifier [
0000: 2C 90 F5 C4 13 6C D4 48   47 DC C5 42 A2 57 4D 2E  ,....l.HG..B.WM.
0010: FD 7F D9 D6                                        ....
]
]

#2: ObjectId: 2.5.29.19 Criticality=false
BasicConstraints:[
  CA:true
  PathLen:2147483647
]

#3: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 2C 90 F5 C4 13 6C D4 48   47 DC C5 42 A2 57 4D 2E  ,....l.HG..B.WM.
0010: FD 7F D9 D6                                        ....
]
]

Trust this certificate? [no]:  yes
Certificate was added to keystore
jinia@jin:~/Desktop/jdk-9.0.4/lib/security$ 
```


java 8에 추가

```bash
jinia@jin:~$ cp ~/Desktop/jdk-9.0.4/lib/security/POSCOICT_CA_256.crt ~/Desktop/jdk1.8.0_162/jre/lib/security/
jinia@jin:~$ cd ~/Desktop/jdk1.8.0_162/jre/lib/security/
jinia@jin:~/Desktop/jdk1.8.0_162/jre/lib/security$ keytool -import -keystore cacerts -storepass changeit -file POSCOICT_CA_256.crt -alias poscoict
... 중략 ...
Certificate was added to keystore
jinia@jin:~/Desktop/jdk1.8.0_162/jre/lib/security$ 
```

## eclipse.ini 

eclipse 를 실행하면 터미널에 로그가 좀 남는다. Gtk-WARING 로그가 나와서 보기 싫다. 
세번째 사이트를 참고해서 eclipse.ini 를 수정한다. launcher.appendVmargs위에 launcher.GTK_version을 추가했다. 

```
-startup
plugins/org.eclipse.equinox.launcher_1.4.0.v20161219-1356.jar
--launcher.library
plugins/org.eclipse.equinox.launcher.gtk.linux.x86_64_1.1.551.v20171108-1834
-product
org.eclipse.epp.package.jee.product
-showsplash
org.eclipse.epp.package.common
--launcher.defaultAction
openFile
--launcher.defaultAction
openFile
--launcher.GTK_version
2
--launcher.appendVmargs
-vmargs
-Dosgi.requiredJavaVersion=1.8
-Dosgi.instance.area.default=@user.home/eclipse-workspace
-XX:+UseG1GC
-XX:+UseStringDeduplication
--add-modules=ALL-SYSTEM
-Dosgi.requiredJavaVersion=1.8
-Xms256m
-Xmx1024m
--add-modules=ALL-SYSTEM
```

다음은 터미널 로그다. 보기싫다. 

```bash
jinia@jin:~$ ~/Desktop/android-studio/bin/studio.sh &
[1] 8887
jinia@jin:~$ ~/Desktop/eclipse/eclipse &
[2] 9086
jinia@jin:~$ WARNING: Using incubator modules: jdk.incubator.httpclient
org.eclipse.m2e.logback.configuration: The org.eclipse.m2e.logback.configuration bundle was activated before the state location was initialized.  Will retry after the state location is initialized.
org.eclipse.m2e.logback.configuration: Logback config file: /home/jinia/Documents/eclipse-workspace/.metadata/.plugins/org.eclipse.m2e.logback.configuration/logback.1.8.2.20171007-0217.xml
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [bundleresource://999.fwk1755295609:1/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [bundleresource://999.fwk1755295609:2/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [ch.qos.logback.classic.util.ContextSelectorStaticBinder]
org.eclipse.m2e.logback.configuration: Initializing logback
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by org.eclipse.emf.ecore.xmi.impl.XMLHandler (file:/home/jinia/Desktop/eclipse/plugins/org.eclipse.emf.ecore.xmi_2.13.0.v20170609-0707.jar) to method com.sun.org.apache.xerces.internal.parsers.AbstractSAXParser$LocatorProxy.getEncoding()
WARNING: Please consider reporting this to the maintainers of org.eclipse.emf.ecore.xmi.impl.XMLHandler
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release

(Eclipse:9115): Gdk-WARNING **: Couldn't map window 0x7fa31298f4d0 as subsurface because its parent is not mapped.

(Eclipse:9115): Gtk-WARNING **: Allocating size to GtkBox 0x7fa310a47e20 without calling gtk_widget_get_preferred_width/height(). How does the code know the size to allocate?

(Eclipse:9115): Gtk-WARNING **: Allocating size to GtkBox 0x7fa310a47e20 without calling gtk_widget_get_preferred_width/height(). How does the code know the size to allocate?

(Eclipse:9115): Gtk-WARNING **: Allocating size to GtkBox 0x7fa310a47e20 without calling gtk_widget_get_preferred_width/height(). How does the code know the size to allocate?

(Eclipse:9115): Gtk-WARNING **: Negative content width -1 (allocation 1, extents 1x1) while allocating gadget (node trough, owner GtkProgressBar)

(Eclipse:9115): Gtk-WARNING **: Negative content width -1 (allocation 1, extents 1x1) while allocating gadget (node trough, owner GtkProgressBar)
jinia@jin:~$ 
```
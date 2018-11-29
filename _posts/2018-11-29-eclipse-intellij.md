---
layout: post
title: "install eclipse & intellij on ubuntu 17.10"
date: 2018-11-29
category: ide
---

# IDE

[Eclipse](https://www.eclipse.org/)와 [Intellij](https://www.jetbrains.com/idea/) 를 다운로드한다.

```bash
$ ls ~/Downloads/
eclipse-java-2018-09-linux-gtk-x86_64.tar.gz
eclipse-jee-2018-09-linux-gtk-x86_64.tar.gz
ideaIC-2018.3.tar.gz
$ 
$ tar xvzf ~/Downloads/eclipse-java-2018-09-linux-gtk-x86_64.tar.gz -C ~/Desktop
$ mv ~/Desktop/eclipse ~/Desktop/eclipse-java-2018-09
$ 
$ tar xvzf ~/Downloads/eclipse-jee-2018-09-linux-gtk-x86_64.tar.gz -C ~/Desktop
$ mv ~/Desktop/eclipse ~/Desktop/eclipse-jee-2018-09
$ 
$ tar xvzf ~/Downloads/ideaIC-2018.3.tar.gz -C ~/Desktop
$ 
$ ls ~/Desktop/
eclipse-java-2018-09
eclipse-jee-2018-09
idea-IC-183.4284.148
$ 
```

## Eclipse 

```bash
$ ~/Desktop/eclipse-java-2018-09/eclipse -data ~/Documents/eclipse-java/ &
[1] 20244
$ 
$ ~/Desktop/eclipse-jee-2018-09/eclipse -data ~/Documents/eclipse-jee/ &
[2] 21232
$ 
```

### eclipse.ini

[Gtk](https://memnoth.github.io/2017/11/how-to-solve-the-problem-of-freezing-of-eclipse-in-linux/)가 뭔지 모르겠으나,  
Gtk-WARNING 로그가 계속 올라오니..  --launcher.appendVmargs 위에 뭔가 추가함.  
Java가 여러개인 경우 -vmargs 위에 명시적으로 java를 설정함.

```bash
-startup
plugins/org.eclipse.equinox.launcher_1.5.100.v20180827-1352.jar
--launcher.library
plugins/org.eclipse.equinox.launcher.gtk.linux.x86_64_1.1.800.v20180827-1352
-product
org.eclipse.epp.package.java.product
-showsplash
org.eclipse.epp.package.common
--launcher.defaultAction
openFile
--launcher.defaultAction
openFile
--launcher.GTK_version
2
--launcher.appendVmargs
-vm
/home/jinia/Desktop/jdk1.8.0_191/bin/java
-vmargs
-Dosgi.requiredJavaVersion=1.8
-Dosgi.instance.area.default=@user.home/eclipse-workspace
-XX:+UseG1GC
-XX:+UseStringDeduplication
--add-modules=ALL-SYSTEM
-Dosgi.requiredJavaVersion=1.8
-Dosgi.dataAreaRequiresExplicitInit=true
-Xms256m
-Xmx1024m
--add-modules=ALL-SYSTEM
```


## IntelliJ

```bash
$ ~/Desktop/idea-IC-183.4284.148/bin/idea.sh &
[1] 21983
$ 
```

Configure > Settings > Tools > Server Certifications 에서 인증서(POSCOICT_CA_256.crt) 추가함.

### 기존 Maven Project Import

Maven Project를 Import 할때,  pom type인 경우 project root에 source 추가하지 않겠다고 선택하고, Finish를 누름.

IntelliJ에서 아래 Event Log 패널에서 Add as a Maven Project 를 클릭함.

Add File to Git 창이 나타나면 *.iml 파일들이기 때문에 Cancel을 클릭함.

IntelliJ에서 아래 Version Control 패널에서 Unversioned Files에 보이는 파일들은 마우스 오른쪽 메뉴에서 ignore.. 찾아서 처리함. Ignore specified file 을 선택함.

IntelliJ에서 오른쪽 Maven 패널에서 root 찾아서 Lifecycle 에서 clean을 찾아서 선택하고, 녹색의 삼각형 버튼(Run Maven Build) 실행함.

IntelliJ에서 아래 Event Log 패널에 Project JDK is not specified 라고 해서 Configure 클릭함.

Project Structure 창이 뜨고, Java 지정하고 Apply 클릭함.

IntelliJ에서 오른쪽 Maven 패널에서 clean 다시 시도하면, 아래 Run 패널에서 로그 확인 가능함.
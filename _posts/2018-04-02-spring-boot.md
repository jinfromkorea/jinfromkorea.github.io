---
layout: post
title: "spring boot"
date: 2018-03-12
category: java
---

https://projects.spring.io/spring-boot/

wget 으로 다운로드하고.  
tar 로 압축 풀고.  
ln 으로 심볼릭 링크 만들고.  

https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/2.0.0.RELEASE/spring-boot-cli-2.0.0.RELEASE-bin.tar.gz

```bash
jinia@jin:~$ cd ~/Downloads/
jinia@jin:~/Downloads$ wget https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/2.0.0.RELEASE/spring-boot-cli-2.0.0.RELEASE-bin.tar.gz
--2018-04-02 16:56:24--  https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/2.0.0.RELEASE/spring-boot-cli-2.0.0.RELEASE-bin.tar.gz
Resolving repo.spring.io (repo.spring.io)... 35.186.232.213
Connecting to repo.spring.io (repo.spring.io)|35.186.232.213|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 8981367 (8.6M) [application/x-gzip]
Saving to: ‘spring-boot-cli-2.0.0.RELEASE-bin.tar.gz’

spring-boot-cli-2.0.0.RELEASE-bin.t 100%[===================================================================>]   8.56M  8.45MB/s    in 1.0s    

2018-04-02 16:56:26 (8.45 MB/s) - ‘spring-boot-cli-2.0.0.RELEASE-bin.tar.gz’ saved [8981367/8981367]

jinia@jin:~/Downloads$ tar xvzf spring-boot-cli-2.0.0.RELEASE-bin.tar.gz -C ~/Desktop
spring-2.0.0.RELEASE/lib/spring-boot-cli-2.0.0.RELEASE.jar
spring-2.0.0.RELEASE/INSTALL.txt
spring-2.0.0.RELEASE/
spring-2.0.0.RELEASE/bin/
spring-2.0.0.RELEASE/legal/
spring-2.0.0.RELEASE/shell-completion/
spring-2.0.0.RELEASE/shell-completion/bash/
spring-2.0.0.RELEASE/shell-completion/zsh/
spring-2.0.0.RELEASE/bin/spring.bat
spring-2.0.0.RELEASE/legal/open_source_licenses.txt
spring-2.0.0.RELEASE/LICENCE.txt
spring-2.0.0.RELEASE/shell-completion/bash/spring
spring-2.0.0.RELEASE/shell-completion/zsh/_spring
spring-2.0.0.RELEASE/bin/spring
jinia@jin:~/Downloads$ cd ~/Desktop/spring-2.0.0.RELEASE/
jinia@jin:~/Desktop/spring-2.0.0.RELEASE$ ln -s ./shell-completion/bash/spring /etc/bash_completion.d/spring
ln: failed to create symbolic link '/etc/bash_completion.d/spring': Permission denied
jinia@jin:~/Desktop/spring-2.0.0.RELEASE$ sudo ln -s ./shell-completion/bash/spring /etc/bash_completion.d/spring
[sudo] password for jinia: 
jinia@jin:~/Desktop/spring-2.0.0.RELEASE$ 
```

```bash
jinia@jin:~$ spring --version
The program 'spring' can be found in the following packages:
 * ruby-spring
 * spring
Try: sudo apt install <selected package>
jinia@jin:~$ cd ~/Desktop/spring-2.0.0.RELEASE/bin/
jinia@jin:~/Desktop/spring-2.0.0.RELEASE/bin$ ./spring  --version
Spring CLI v2.0.0.RELEASE
jinia@jin:~/Desktop/spring-2.0.0.RELEASE/bin$ 
```


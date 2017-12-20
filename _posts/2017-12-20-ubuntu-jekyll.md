---
layout: post
title: "jekyll 과 bundler 설치하기"
date: 2017-12-20
category: github
---

github page를 로컬에서 먼저 테스트 하려면.. 아래 명령어를 실행해야한다.

```
cd jinfromkorea.github.io
bundle exec jekyll serve 
```

[https://jekyllrb.com/docs/quickstart/](https://jekyllrb.com/docs/quickstart/) 참고해서 jekyll과 bundler를 설치하려고 했더니 
ERROR 가..

```
jinia@jin:~$ gem install jekyll bundler
ERROR:  Could not find a valid gem 'jekyll' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=error: certificate verify failed (https://api.rubygems.org/specs.4.8.gz)
ERROR:  Could not find a valid gem 'bundler' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=error: certificate verify failed (https://api.rubygems.org/specs.4.8.gz)
jinia@jin:~$
```

구글링과 몇가지 시도를 통해.. 겨우 해결했다.  
브라우저에 인증서를 등록하려고 사용했던 인증서 파일을 이용하면 되는데.. 파일확장자(*.crt)는 수정이 필요한가 보다.  

```sudo dpkg-reconfigure ca-certificates```를 실행하면 crt 파일 목록이 쭉 나타나니까 회사인증서 추가하면 된다.  

```
jinia@jin:~$ cd /usr/share/ca-certificates/
jinia@jin:/usr/share/ca-certificates$ ls -al
total 32
drwxr-xr-x   4 root root  4096 Dec 19 15:18 .
drwxr-xr-x 301 root root 12288 Dec 20 15:59 ..
drwxr-xr-x   2 root root  4096 Dec 19 15:23 extra
drwxr-xr-x   2 root root 12288 Dec 19 22:13 mozilla
jinia@jin:/usr/share/ca-certificates$ cd extra
jinia@jin:/usr/share/ca-certificates/extra$ ls
POSCOICT_CA_256.cer
jinia@jin:/usr/share/ca-certificates/extra$ sudo mv ./POSCOICT_CA_256.cer ./POSCOICT_CA_256.crt
jinia@jin:/usr/share/ca-certificates/extra$ ls 
POSCOICT_CA_256.crt
jinia@jin:/usr/share/ca-certificates/extra$ sudo dpkg-reconfigure ca-certificates
Updating certificates in /etc/ssl/certs...
1 added, 0 removed; done.
Processing triggers for ca-certificates (20170717) ...
Updating certificates in /etc/ssl/certs...
0 added, 0 removed; done.
Running hooks in /etc/ca-certificates/update.d...
done.
jinia@jin:/usr/share/ca-certificates$ 
```

permission 땜시 sudo를 붙여서 설치하면 된다. 

```
jinia@jin:~$ gem install jekyll bundler
Fetching: public_suffix-3.0.1.gem (100%)
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /var/lib/gems/2.3.0 directory.
jinia@jin:~$ sudo gem install jekyll bundler
Fetching: public_suffix-3.0.1.gem (100%)
Successfully installed public_suffix-3.0.1

... 중략 ...

Done installing documentation for bundler after 4 seconds
21 gems installed
jinia@jin:~$ 
```

```bundle exec jekyll serve```으로 GitHub Page 사이트를 띄울랬더니 충돌이 생겼나 보다. 

```
jinia@jin:~/Documents/GitHub/jinfromkorea.github.io$ bundle exec jekyll serve
Bundler could not find compatible versions for gem "nokogiri":
  In snapshot (Gemfile.lock):
    nokogiri (= 1.8.1)

  In Gemfile:
    github-pages was resolved to 161, which depends on
      jekyll-mentions (= 1.2.0) was resolved to 1.2.0, which depends on
        html-pipeline (~> 2.3) was resolved to 2.7.0, which depends on
          nokogiri (>= 1.4)

Running `bundle update` will rebuild your snapshot from scratch, using only
the gems in your Gemfile, which may resolve the conflict.
jinia@jin:~/Documents/GitHub/jinfromkorea.github.io$
```

```bundle update```를 해보라고 하니... 

```
jinia@jin:~/Documents/GitHub/jinfromkorea.github.io$ bundle update
Fetching gem metadata from https://rubygems.org/..............
Fetching gem metadata from https://rubygems.org/..
Resolving dependencies.....
Fetching concurrent-ruby 1.0.5
Installing concurrent-ruby 1.0.5

... 중략 ...

Bundle updated!
Post-install message from html-pipeline:
-------------------------------------------------
Thank you for installing html-pipeline!
You must bundle Filter gem dependencies.
See html-pipeline README.md for more details.
https://github.com/jch/html-pipeline#dependencies
-------------------------------------------------
jinia@jin:~/Documents/GitHub/jinfromkorea.github.io$
```

다 된듯하니.. ```bundle exec jekyll serve```를 실행하면 된다. 

```
jinia@jin:~/Documents/GitHub/jinfromkorea.github.io$ bundle exec jekyll serve
Configuration file: /home/jinia/Documents/GitHub/jinfromkorea.github.io/_config.yml
            Source: /home/jinia/Documents/GitHub/jinfromkorea.github.io
       Destination: /home/jinia/Documents/GitHub/jinfromkorea.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 0.603 seconds.
 Auto-regeneration: enabled for '/home/jinia/Documents/GitHub/jinfromkorea.github.io'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

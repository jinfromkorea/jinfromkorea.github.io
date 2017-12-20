---
layout: page
---

Ruby

# Ruby

ruby 설치여부는 버전 확인으로 가능

```
ruby -v
gem -v
```

[https://www.ruby-lang.org](https://www.ruby-lang.org) 에서 다운받아 설치하면 되지 싶다. 

windows와 mac에서 설치 방법은 나중에 추가해야지. 

## Ubuntu 17.10

[https://www.ruby-lang.org/en/documentation/installation/](https://www.ruby-lang.org/en/documentation/installation/) 를 참고해서 설치하면 된다. 

```
sudo apt-get install ruby-full
```

설치후에는 ruby와 gem의 버전을 확인 할 수 있음. 

```
jinia@jin:~$ sudo apt-get install ruby-full
[sudo] password for jinia: 
Reading package lists... Done
Building dependency tree       
Reading state information... Done

... 중략 ... 

jinia@jin:~$ ruby -v
ruby 2.3.3p222 (2016-11-21) [x86_64-linux-gnu]
jinia@jin:~$ gem -v
2.5.2
jinia@jin:~$ 
```

### jekyll 설치

```
gem install jekyll bundler
```
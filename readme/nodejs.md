---
layout: page
---

nodejs

# nodejs

node 설치여부는 버전 확인으로 가능

```
node -v
npm -v
```

[https://nodejs.org/](https://nodejs.org/) 에서 LTS 버전을 다운받아서 설치하면 될듯하다.

내가 설치해본 환경은 다음과 같다. 

## Windows

[https://nodejs.org/](https://nodejs.org/) 에서 LST버전 다운 받아서 설치하면 된다.  
node-v8.9.3-x64.msi 파일이 다운받아지고, 그냥 더블클릭하면 알아서 설치된다. 

## Mac

[https://nodejs.org/](https://nodejs.org/) 에서 LST버전 다운 받아서 설치하면 된다.  
node-v8.9.3.pkg 파일을 다운받아지고, 그냥 더블클릭하면 알아서 설치된다.

## Ubuntu 17.10

[https://nodejs.org/](https://nodejs.org/) 에서 LST버전 다운 받아서 설치하면 될 줄 알았는데 아니다.  
node-v8.9.3-linux-x64.tar.xz 파일은 압축 파일인데.. 압축 풀어서 어떻게 하라는 건지 모르겠다. 

### apt-get 을 이용해서 설치

그래서 구글링([참고](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions))을 했더니..  
package manager로 설치하는 방법이 나와있다. 

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

불행히도 최신LTS 버전이 설치되지 않고, npm도 설치되지 않는다.  

```
jinia@jin:~$ node -v
v6.11.4
jinia@jin:~$ npm -v
The program 'npm' is currently not installed. You can install it by typing:
sudo apt install npm
jinia@jin:~$ 
```
nodejs 처럼 npm을 설치하는것까지 진행했다.

```
jinia@jin:~$ sudo apt-get install -y npm

 ... 중략 ... 

jinia@jin:~$ npm -v
3.5.2
jinia@jin:~$ 
```  

### nvm 

node를 버전별로 설치할수 있다는데 그래서 nvm 을 설치했는데.. 확인결과 딱히 최신버전이 나타나지 않아서 실패. 

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

```
jinia@jin:~$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current

... 중략 ...

jinia@jin:~$ nvm ls-remote
            N/A
jinia@jin:~$ 
```

npm 도 최신버전으로 설치하려고 해봤지만, 오류는 없지만, 결과는 실패.

```
jinia@jin:~$ sudo npm install npm@latest -g
[sudo] password for jinia: 
/usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
/usr/local/bin/npx -> /usr/local/lib/node_modules/npm/bin/npx-cli.js
/usr/local/lib
├── abbrev@1.1.1 
├── ansi-regex@3.0.0 
├── aproba@1.2.0 
├── bin-links@1.1.0 
├── bluebird@3.5.1 

... 중략 ...

jinia@jin:~$ npm -v
3.5.2
jinia@jin:~$ 
```

참고  
https://joshtronic.com/2017/10/20/upgrade-to-nodejs-8-on-ubuntu-1710/  
https://joshtronic.com/2017/12/11/upgrade-to-nodejs-8-on-debian-and-ubuntu/
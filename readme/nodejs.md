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

## Windows

https://nodejs.org/ 에서 LST버전 다운 받아서 설치하면 된다.  
https://nodejs.org/dist/v8.9.3/node-v8.9.3-x64.msi 를 다운받아 더블클릭하면 알아서 설치된다. 

## Mac

https://nodejs.org/ 에서 LST버전 다운 받아서 설치하면 된다.  
https://nodejs.org/dist/v8.9.3/node-v8.9.3.pkg 을 다운받아 더블클릭하면 알아서 설치된다.

## Ubuntu 17.10

https://nodejs.org/ 에서 LST버전 다운 받아서 설치하면 될듯하다. ( 근데 압축 푼다음에 어떻게 해야할지 모르겠다. )
https://nodejs.org/dist/v8.9.3/node-v8.9.3-linux-x64.tar.xz

그래서 구글링을 했더니..  
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
불행히도 최신LTS 버전이 설치되지 않았다. 그리고 npm도 설치되지 않은듯 하다.   
비슷하게 설치하긴 하는데 버전이 영 낮다. 
```
jinia@jin:~$ node -v
v6.11.4
jinia@jin:~$ which node
/usr/bin/node
jinia@jin:~$ npm -v
The program 'npm' is currently not installed. You can install it by typing:
sudo apt install npm
jinia@jin:~$ 
jinia@jin:~$ sudo apt-get install -y npm
....
jinia@jin:~$ npm -v
3.5.2
```  

node를 버전별로 설치할수 있다는데 그래서 nvm 을 설치했는데.. 

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```
딱히 최신버전이 나타나지 않는다. 
```
jinia@jin:~$ nvm ls-remote
            N/A
jinia@jin:~$ 
```

npm 도 최신버전으로 설치하려고 해봐도 되지 않는다.
```
npm install npm@latest -g
```

참고 : https://joshtronic.com/2017/10/20/upgrade-to-nodejs-8-on-ubuntu-1710/
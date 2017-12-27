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


# npm

npm *command*

*command* 에는 install, ls 등이 있구먼. 

```
jinia@jin:~/Documents/GitHub/hello-world/src/react/my-app$ npm -h

Usage: npm <command>

where <command> is one of:
    access, adduser, bin, bugs, c, cache, completion, config,
    ddp, dedupe, deprecate, dist-tag, docs, doctor, edit,
    explore, get, help, help-search, i, init, install,
    install-test, it, link, list, ln, login, logout, ls,
    outdated, owner, pack, ping, prefix, profile, prune,
    publish, rb, rebuild, repo, restart, root, run, run-script,
    s, se, search, set, shrinkwrap, star, stars, start, stop, t,
    team, test, token, tst, un, uninstall, unpublish, unstar,
    up, update, v, version, view, whoami

npm <command> -h     quick help on <command>
npm -l           display full usage info
npm help <term>  search for help on <term>
npm help npm     involved overview

Specify configs in the ini-formatted file:
    /home/jinia/.npmrc
or on the command line via: npm <command> --key value
Config info can be viewed via: npm help config

npm@5.6.0 /usr/local/lib/node_modules/npm
jinia@jin:~/Documents/GitHub/hello-world/src/react/my-app$ 
```

npm install -g *package_name*

-g 존재 유무에 따라  globally하게 설치할지 locally하게 설치할지 정해지는구먼. 

## create-react-app

```
jinia@jin:~$ sudo npm install -g create-react-app
/usr/local/bin/create-react-app -> /usr/local/lib/node_modules/create-react-app/index.js
+ create-react-app@1.4.3
added 106 packages in 6.274s
jinia@jin:~$ 
```

## gulp-cli

```
jinia@jin:~$ sudo npm install -g gulp-cli
/usr/local/bin/gulp -> /usr/local/lib/node_modules/gulp-cli/bin/gulp.js
+ gulp-cli@2.0.0
added 217 packages in 13.066s
jinia@jin:~$ 
```

## http-server

```
jinia@jin:~$ sudo npm install -g http-server
/usr/local/bin/http-server -> /usr/local/lib/node_modules/http-server/bin/http-server
/usr/local/bin/hs -> /usr/local/lib/node_modules/http-server/bin/http-server
+ http-server@0.10.0
added 23 packages in 3.208s
jinia@jin:~$ 
```

## electron

```
jinia@jin:~/Documents/GitHub/hello-world/src/electron$ npm install electron

> electron@1.7.10 postinstall /home/jinia/Documents/GitHub/hello-world/src/electron/node_modules/electron
> node install.js

npm WARN saveError ENOENT: no such file or directory, open '/home/jinia/Documents/GitHub/hello-world/src/electron/package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open '/home/jinia/Documents/GitHub/hello-world/src/electron/package.json'
npm WARN electron No description
npm WARN electron No repository field.
npm WARN electron No README data
npm WARN electron No license field.

+ electron@1.7.10
added 152 packages in 63.914s
jinia@jin:~/Documents/GitHub/hello-world/src/electron$
```
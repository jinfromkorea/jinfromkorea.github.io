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

며칠후에 해보니. 최신버전 받아진다. 
```
jinia@jin:~$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

## Installing the NodeSource Node.js v8.x repo...


## Populating apt-get cache...

+ apt-get update
Hit:1 http://kr.archive.ubuntu.com/ubuntu artful InRelease
Get:2 http://kr.archive.ubuntu.com/ubuntu artful-updates InRelease [78.6 kB]                                                                 
Get:3 http://kr.archive.ubuntu.com/ubuntu artful-backports InRelease [72.2 kB]                                                                          
Ign:4 http://dl.google.com/linux/chrome/deb stable InRelease                                                                                    
Get:5 http://kr.archive.ubuntu.com/ubuntu artful-updates/main amd64 Packages [137 kB]          
Get:6 http://dl.google.com/linux/chrome/deb stable Release [1,189 B]                                             
Get:7 http://kr.archive.ubuntu.com/ubuntu artful-updates/main i386 Packages [135 kB]                                  
Hit:8 http://packages.microsoft.com/repos/vscode stable InRelease                                       
Get:10 http://kr.archive.ubuntu.com/ubuntu artful-updates/main amd64 DEP-11 Metadata [56.6 kB]          
Get:11 http://kr.archive.ubuntu.com/ubuntu artful-updates/main DEP-11 64x64 Icons [35.2 kB]                        
Get:12 http://kr.archive.ubuntu.com/ubuntu artful-updates/universe amd64 Packages [48.7 kB]
Get:13 http://kr.archive.ubuntu.com/ubuntu artful-updates/universe i386 Packages [48.3 kB]
Get:14 http://kr.archive.ubuntu.com/ubuntu artful-updates/universe amd64 DEP-11 Metadata [48.2 kB]
Get:15 http://kr.archive.ubuntu.com/ubuntu artful-updates/universe DEP-11 64x64 Icons [48.4 kB]
Get:16 http://kr.archive.ubuntu.com/ubuntu artful-backports/main i386 Packages [1,504 B]                  
Get:17 http://kr.archive.ubuntu.com/ubuntu artful-backports/main amd64 Packages [1,508 B]
Get:18 http://kr.archive.ubuntu.com/ubuntu artful-backports/universe amd64 DEP-11 Metadata [4,708 B]
Get:19 http://security.ubuntu.com/ubuntu artful-security InRelease [78.6 kB]
Get:20 http://security.ubuntu.com/ubuntu artful-security/main amd64 DEP-11 Metadata [204 B]
Get:21 http://security.ubuntu.com/ubuntu artful-security/universe amd64 DEP-11 Metadata [10.2 kB]
Fetched 806 kB in 2s (346 kB/s)               
Reading package lists... Done

## Confirming "artful" is supported...

+ curl -sLf -o /dev/null 'https://deb.nodesource.com/node_8.x/dists/artful/Release'

## Adding the NodeSource signing key to your keyring...

+ curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
OK

## Creating apt sources list file for the NodeSource Node.js v8.x repo...

+ echo 'deb https://deb.nodesource.com/node_8.x artful main' > /etc/apt/sources.list.d/nodesource.list
+ echo 'deb-src https://deb.nodesource.com/node_8.x artful main' >> /etc/apt/sources.list.d/nodesource.list

## Running `apt-get update` for you...

+ apt-get update
Hit:1 http://kr.archive.ubuntu.com/ubuntu artful InRelease
Hit:2 http://kr.archive.ubuntu.com/ubuntu artful-updates InRelease                                                                                               
Hit:3 http://packages.microsoft.com/repos/vscode stable InRelease                                                                                                
Hit:4 http://kr.archive.ubuntu.com/ubuntu artful-backports InRelease                                                
Ign:5 http://dl.google.com/linux/chrome/deb stable InRelease                                                        
Get:6 http://dl.google.com/linux/chrome/deb stable Release [1,189 B]                           
Get:7 https://deb.nodesource.com/node_8.x artful InRelease [4,622 B]                                      
Hit:8 http://security.ubuntu.com/ubuntu artful-security InRelease               
Get:10 https://deb.nodesource.com/node_8.x artful/main i386 Packages [765 B]
Get:11 https://deb.nodesource.com/node_8.x artful/main amd64 Packages [766 B]
Fetched 7,342 B in 1s (6,750 B/s)  
Reading package lists... Done

## Run `apt-get install nodejs` (as root) to install Node.js v8.x and npm

jinia@jin:~$ sudo apt-get install -y nodejs
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  gyp libc-ares2 libjavascriptcoregtk-1.0-0 libjs-inherits libjs-node-uuid libjs-underscore libssl-dev libssl-doc libssl1.0-dev libuv1 libuv1-dev
  libwebkitgtk-1.0-0 node-abbrev node-ansi node-ansi-color-table node-archy node-async node-balanced-match node-block-stream node-brace-expansion
  node-builtin-modules node-combined-stream node-concat-map node-cookie-jar node-delayed-stream node-forever-agent node-form-data node-fs.realpath node-fstream
  node-fstream-ignore node-github-url-from-git node-glob node-graceful-fs node-gyp node-hosted-git-info node-inflight node-inherits node-ini
  node-is-builtin-module node-isexe node-json-stringify-safe node-lockfile node-lru-cache node-mime node-minimatch node-mkdirp node-mute-stream node-node-uuid
  node-nopt node-normalize-package-data node-npmlog node-once node-osenv node-path-is-absolute node-pseudomap node-qs node-read node-read-package-json
  node-request node-retry node-rimraf node-semver node-sha node-slide node-spdx-correct node-spdx-expression-parse node-spdx-license-ids node-tar
  node-tunnel-agent node-underscore node-validate-npm-package-license node-which node-wrappy node-yallist nodejs-doc zlib1g-dev
Use 'sudo apt autoremove' to remove them.
The following packages will be REMOVED:
  nodejs-dev npm
The following packages will be upgraded:
  nodejs
1 upgraded, 0 newly installed, 2 to remove and 9 not upgraded.
Need to get 12.6 MB of archives.
After this operation, 33.6 MB of additional disk space will be used.
Get:1 https://deb.nodesource.com/node_8.x artful/main amd64 nodejs amd64 8.9.3-1nodesource1 [12.6 MB]
Fetched 12.6 MB in 2s (4,709 kB/s) 
(Reading database ... 195797 files and directories currently installed.)
Removing npm (3.5.2-0ubuntu4) ...
dpkg: nodejs-dev: dependency problems, but removing anyway as you requested:
 node-gyp depends on nodejs-dev.

Removing nodejs-dev (6.11.4~dfsg-1ubuntu1) ...
(Reading database ... 192731 files and directories currently installed.)
Preparing to unpack .../nodejs_8.9.3-1nodesource1_amd64.deb ...
Unpacking nodejs (8.9.3-1nodesource1) over (6.11.4~dfsg-1ubuntu1) ...
Setting up nodejs (8.9.3-1nodesource1) ...
Processing triggers for man-db (2.7.6.1-2) ...
jinia@jin:~$ node -v
v8.9.3
jinia@jin:~$ 
```

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
jinia@jin:~$ date
Thu Dec 28 16:12:13 KST 2017
jinia@jin:~/Documents/GitHub/first$ sudo npm install electron -g --unsafe-perm=true
/usr/local/bin/electron -> /usr/local/lib/node_modules/electron/cli.js

> electron@1.7.10 postinstall /usr/local/lib/node_modules/electron
> node install.js

+ electron@1.7.10
added 152 packages in 11.22s
jinia@jin:~/Documents/GitHub/first$ 
```

## asar

```
jinia@jin:~$ sudo npm install -g asar
[sudo] password for jinia: 
/usr/local/bin/asar -> /usr/local/lib/node_modules/asar/bin/asar.js
+ asar@0.14.0
added 92 packages in 5.423s
jinia@jin:~$ 
```

## electron-is-dev

```
jinia@jin:~$ sudo npm install electron-is-dev -g
[sudo] password for jinia: 
+ electron-is-dev@0.3.0
added 1 package in 0.243s
jinia@jin:~$ 
```

## node-gyp

```
jinia@jin:~$ sudo npm install -g node-gyp
[sudo] password for jinia: 
/usr/local/bin/node-gyp -> /usr/local/lib/node_modules/node-gyp/bin/node-gyp.js
+ node-gyp@3.6.2
added 101 packages in 4.169s
jinia@jin:~$ 
```

## webpack

```
jinia@jin:~$ sudo npm install webpack -g
[sudo] password for jinia: 
/usr/local/bin/webpack -> /usr/local/lib/node_modules/webpack/bin/webpack.js

> uglifyjs-webpack-plugin@0.4.6 postinstall /usr/local/lib/node_modules/webpack/node_modules/uglifyjs-webpack-plugin
> node lib/post_install.js

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.1.3 (node_modules/webpack/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

+ webpack@3.10.0
added 251 packages in 11.157s
jinia@jin:~$ 
```
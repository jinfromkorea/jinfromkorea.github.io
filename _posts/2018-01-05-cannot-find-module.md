---
layout: post
title: "Cannot find module 'electron-is-dev'"
date: 2018-01-05
category: javascript
---


프로젝트에 electron, electron-is-dev, electron-packager, react, react-dom 모듈을 추가할 때 `--save-dev` 옵션으로 추가했더니.. 

package.json 파일의 devDependencies 에 추가된다. 
```
{
  "name": "first",
  "version": "1.0.0",
  "description": "demo for raspberry",
  "main": "index.js",
  "scripts": {
    "start": "electron .",
    "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
    "package-win": "electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Shopping List\"",
    "package-linux": "electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/icon.png --prune=true --out=release-builds"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/poscoict-arvrmr/second.git"
  },
  "author": "poscoict",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/poscoict-arvrmr/second/issues"
  },
  "homepage": "https://github.com/poscoict-arvrmr/second#readme",
  "devDependencies": {
    "electron": "^1.7.10",
    "electron-is-dev": "^0.3.0",
    "electron-packager": "^10.1.1"
    "react": "^16.2.0",
    "react-dom": "^16.2.0"
  }
}
```


그냥 `electron .` 으로 실행할때는 문제 될 것이 없었으나.. 패키징된 결과물로 실행하려고 하면 오류가 난다. 

```
jinia@jin:~/Documents/GitHub/second$ npm run package-linux

> first@1.0.0 package-linux /home/jinia/Documents/GitHub/second
> electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/icon.png --prune=true --out=release-builds

Packaging app for platform linux x64 using electron v1.7.10
Wrote new app to release-builds/first-linux-x64
jinia@jin:~/Documents/GitHub/second$
jinia@jin:~/Documents/GitHub/second$
jinia@jin:~/Documents/GitHub/second$
jinia@jin:~/Documents/GitHub/second$ ls 
assets  index.js  mainDev.html  main.html  node_modules  package.json  package-lock.json  README.md  release-builds
jinia@jin:~/Documents/GitHub/second$ cd release-builds/first-linux-x64/
jinia@jin:~/Documents/GitHub/second/release-builds/first-linux-x64$ 
jinia@jin:~/Documents/GitHub/second/release-builds/first-linux-x64$ 
jinia@jin:~/Documents/GitHub/second/release-builds/first-linux-x64$ 
jinia@jin:~/Documents/GitHub/second/release-builds/first-linux-x64$ chmod +x ./first 
jinia@jin:~/Documents/GitHub/second/release-builds/first-linux-x64$ ./first
A JavaScript error occurred in the main process
Uncaught Exception:
Error: Cannot find module 'electron-is-dev'
    at Module._resolveFilename (module.js:470:15)
    at Function.Module._resolveFilename (/home/jinia/Documents/GitHub/second/release-builds/first-linux-x64/resources/electron.asar/common/reset-search-paths.js:35:12)
    at Function.Module._load (module.js:418:25)
    at Module.require (module.js:498:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/home/jinia/Documents/GitHub/second/release-builds/first-linux-x64/resources/app/index.js:7:15)
    at Object.<anonymous> (/home/jinia/Documents/GitHub/second/release-builds/first-linux-x64/resources/app/index.js:72:3)
    at Module._compile (module.js:571:32)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:488:32)
```


package.json 파일에서 devDependencies 지우고.. --save-dev 대신에 --save 옵션으로 다음을 실행하면 된다. 

```
npm install electron electron-is-dev electron-packager react react-doc --save 
npm run package-linux
release-builds/first-linux-x64/first
```

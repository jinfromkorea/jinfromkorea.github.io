---
layout: post
title: "jekyll minima 테마를 커스터마이징하기"
date: 2017-09-20
category: github
---

github에 가입은 했고..  
github page 라는게 있어서.. 사이트를 만들어서 운영할 수가 있다고 하는군..  

local repository 위치는 `` D:/git/jinfromkorea.github.io `` 으로 하고   
minima 테마 위치는 `` C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/minima-2.1.1 `` 에 있는게 확인되고  

![Image](/images/jekyll_minima_loc.png)

![Image](/images/jekyll_minima_files.png)

[https://jekyllrb.com/docs/github-pages/](https://jekyllrb.com/docs/github-pages/) 에 소개된 
[참고 사이트 'by Jonathan McGlone'](http://jmcglone.com/guides/github-pages/)를 보니.. 도움이 되었음. 

https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/ 참고해서  
시작메뉴에서 ``Start Command Prompt with Ruby`` 를 찾아서 실행. 
```
cd jinfromkorea.github.io
bundle exec jekyll serve 
```
![Image](/images/bundle_exec_jekyll_serve.png)


---
layout: post
title: "IIFE (Immediately Invoked Function Expression)"
date: 2017-11-15
category: javascript
---

다음과 같은 code를 이해하려고 구글링을 해보았음. 

```
var cameraSource = (function(global) {
    var id='source-camera', videoElement=null, constraints={video:{facingMode:"environment"}};
    function start(opts) {
        constraints = opts.constraints;
        videoElement = opts.videoElement;
        _showCameraPreview(opts.callback);
    }
    function _showCameraPreview(_callbcak) {
        navigator.mediaDevices.getUserMedia(constraints).then( stream => {
            videoElement.srcObject = stream;
            videoElement.play();
            if (_callbcak) {
                _callbcak(stream);
            }
        }).catch( error => console.error(error) );
    }
    return { id: id, start: start };
})(this);
```


javascript에서 function을 일단은 어렵다. 

https://blog.kevinchisholm.com/javascript/javascript-immediate-functions-basics/ 참고 하길..  

아래와 같은 코드는 그냥 정의만 한거다. myFunc(); 라는게 불려야 실행될뿐. 
```
var myFunc = function(){
	console.log('simple function');
}

myFunc();
```

아래와 같은 코드는 function을 괄호로 감쌈으로서 바로 실행까지 된다. 아래 두개의 차이는 잘 모르겟음. 
둘다 immediate function 이라는데..   테스트 해보고. 되는걸로 사용하는게 좋을듯함. 
```
(function(){
    console.log('immediate function')
}())

(function(){
    console.log('immediate function')
})()
```

아래와 같은 코드는 function에 argumnet를 넘기는 예제임. 
```
var myname = 'yujin';
(function(name){
	console.log('hi,' + name)
}(myname))
```


https://blog.kevinchisholm.com/javascript/immediate-function-global-javascript-variable/ 도 참고하길.. 

```
var foo = {};
foo.name = 'yujin';
foo.say = function{}
```

foo 라는 아이는 global 변수가 되고.. foo의 property는 접근하는데 제약이 없는듯 하고..    
근데 아래처럼 하면.. '_name' 을 private 변수처럼 사용할 수 있는듯함. 
```
var foo = (function(){
    var _name = "bart";
    var MyConstructor = function(){
        this.getName = function(){
            return _name;
        };
        this.setName = function(newName){
            _name = newName;
        };
    }
    return new MyConstructor();
})();
 
console.log( foo.getName() );
console.log( foo.setName( "simpson" ) );
console.log( foo.getName() );
```
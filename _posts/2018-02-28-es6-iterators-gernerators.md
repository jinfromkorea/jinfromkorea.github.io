---
layout: post
title: "iterators & generators"
date: 2018-02-28
category: javascript
---

# Iterators

[Standard built-in object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)에 
Symbol 이 있고,  
[Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 를 통해 
반복처리가 가능하다. 

## for .. of .. loop

```js
const message = 'hello world';
console.log(message[Symbol.iterator]);   // ƒ [Symbol.iterator]() { [native code] }
console.log(message[Symbol.iterator]()); // StringIterator {}
```

```js
const message = 'hello world';
for(let char of message){
    console.log(char); // h
                       // e
                       // l
                       // ...
}
```

## .next function

```js
const message = 'hello world';
const iter = message[Symbol.iterator]();
console.log(iter);
```
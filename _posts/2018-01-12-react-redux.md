---
layout: post
title: "redux"
date: 2018-01-12
category: javascript
---

https://velopert.com/1225 
- MVC 패턴과 FLUX 패턴에 대한 이야기가 나오고..  
  FLUX 아키텍쳐를 편하게 해주는게 redux라는 라이브러리라고 한다. 

Flux에서는 action, dispacher, store, view 라는 용어가 있음. 

redux의 3가지 원칙은 
- single source of truth : 1개의 store만 쓰라는 거고..   
- state is readonly : 
- changes are made with pure functions  
application에서 state를 변경할 수 없다. action이 dispath하여 state를 변경한다. 
action 객체라는게 있고, action 객체를 처리하는 함수가 reducer라 불린다. 
reducer는 pure해야 한다. 

ReactDOM.render(element, container[, callback]) 형태로 시작되고. 
element 가 컴포넌트라고 보면 됨. 
<whateverComponent attr1='val1' attr2='val2' store={store}></elemwhateverComponentent> 형태일것이고. 

whateverComponent 라는 component는 구현될 것이고. 
class whateverComponent extends React.Component{
  render(){
    return (
      <div>{this.props.attr1}, {this.props.attr2}, {this.props.store.getState().value}</div>
    )
  }
}
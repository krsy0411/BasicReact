/* @jsx createElement */
// 윗 주석은 babel compiler에 의해 React.createElement로 함수가 생성되지 않도록 설정하기 위함(jsx문법 사용시)
import { createDOM, createElement, render } from "./react";

// dom을 객체형태로 다 풀어서 만들어 놓은 형태
const vdom = {
  tag: 'p',
  props: {},
  children: [
    {
      tag: 'h1',
      props: {},
      children: ["React 만들기"],
    },
    {
      tag: 'ul',
      props: {},
      children: [
        {
          tag: 'li',
          props: {
            style: "color:red",
          },
          children: ["첫 번째 아이템"]
        },
        {
          tag: 'li',
          props: {
            style: "color:blue",
          },
          children: ["두 번째 아이템"]
        },
        {
          tag: 'li',
          props: {
            style: "color:green",
          },
          children: ["세 번째 아이템"]
        },
      ]
    }
  ],
};

const vdom2 = createElement('p', {}, 
  createElement('h1', {}, "React 만들기"),
  createElement('ul', {}, 
    createElement('li', { style: "color:red" }, "첫 번째 아이템"),
    createElement('li', { style: "color:blue" }, "두 번째 아이템"),
    createElement('li', { style: "color:green" }, "세 번째 아이템"),
    )
  );

// jsx문법을 이용한 virtual dom
const vdom3 = <p>
  <h1>React 만들기</h1>
  <ul>
    <li style = "color:red">첫 번째 아이템</li>
    <li style = "color:blue">두 번째 아이템</li>
    <li style = "color:green">세 번째 아이템</li>
  </ul>
</p>

// 함수 컴포넌트 사용한 vdom

function Title(props) {
  return <h1>{ props.children }</h1>;
}

function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>
}


const vdom4 = <p>
  <Title label="React">React 정말 잘 만들기</Title>
  <ul>
    <Item color="red">첫 번째 아이템</Item>
    <Item color="green">두 번째 아이템</Item>
    <Item color="blue">세 번째 아이템</Item>
  </ul>
</p>

render(vdom4, document.querySelector('#root'));
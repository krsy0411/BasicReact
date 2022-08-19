import { NoEmitOnErrorsPlugin } from "webpack";
import { createDOM } from "../react";

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

// DOM형성
function creatDOM(node) {
  // 노드가 text인 경우의 방어코드 작성
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  // 노드가 tag인 경우
  const element = document.createElement(node.tag);

  // children dom 형성
  node.children
    .map(createDOM)
    // 여러 개의 children을 반복문을 돌면서 자식 tag로 추가
    .forEach(element.appendChild.bind(element));

  return element;
}

// 렌더링(UI를 만들어내는 함수)
function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}
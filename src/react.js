
// DOM형성
export function creatDOM(node) {
  // 노드가 text인 경우의 방어코드 작성
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  // 노드가 tag인 경우
  const element = document.createElement(node.tag);

  // 노드의 속성들을 배열 형태로 빼낸 후에, 객체에 속성 추가
  Object.entries(node.props)
    .forEach(([name, value]) => element.setAttribute(name, value));

  // children dom 형성
  node.children
    .map(createDOM)
    // 여러 개의 children을 반복문을 돌면서 자식 tag로 추가
    .forEach(element.appendChild.bind(element));

  return element;
}

export function creatElement(tag, props, ...children) {
  return { tag, props, children };
}

// 렌더링(UI를 만들어내는 함수)
export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}

// DOM형성
export function createDOM(node) {
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

// 전개 연산자를 통해서 children은 배열 형태로 만들어준다
export function createElement(tag, props, ...children) {
  // babel transpiling을 이용하면 빈 객체 사용시 null로 반환하기 때문에 방어코드 작성
  props = props || {};

  if (typeof tag === 'function') {
    // 자식요소가 하나라도 존재하면
    if (children.length > 0) {
      // 객체 형태로 리턴
      return tag({
        ...props,
        children: children.length === 1 ? children[0] : children,
      })
    } else {
      return tag(props);
    }
  } else {
    return { tag, props, children }; 
  }
}

// 렌더링(UI를 만들어내는 함수)
export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}
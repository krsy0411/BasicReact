const hooks = [];
const currentComponent = 0;


// 클래스 컴포넌트
export class Component {
  constructor(props) {
    this.props = props;
  }
}

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


// 클래스 컴포넌트 이용시 속성을 만들어줄 헬퍼함수
function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
}

export function useState(initValue) {
  let position = currentComponent - 1;

  if (!hooks[position]) {
    hooks[position] = initValue;
  }

  const modifier = nextValue => {
    hooks[position] = nextValue;
  };

  return [ hooks[position], modifier ];
}

// 전개 연산자를 통해서 children은 배열 형태로 만들어준다
export function createElement(tag, props, ...children) {
  // babel transpiling을 이용하면 빈 객체 사용시 null로 반환하기 때문에 방어코드 작성
  props = props || {};

/*  // 함수 컴포넌트인지 확인
  if (typeof tag === 'function') {
    // 자식요소가 하나라도 존재하면
    if (children.length > 0) {
      // 객체 형태로 리턴 : app.js에서 쉽게 props를 받기 위함
      return tag({
        ...props,
        children: children.length === 1 ? children[0] : children,
      })
    } else {
      return tag(props);
    }
  } else {
    return { tag, props, children }; 
  } */

  // 클래스 컴포넌트 이용한 ver
  if (typeof tag === 'function') {
    // 일반 typeof 연산자는 클래스와 함수를 구분하지 못하므로 prototype 이용
    if (tag.prototype instanceof Component) {
      // 클래스의 인스턴스 객체를 만들어 렌더링
      const instance = new tag(makeProps(props, children));
      return instance.render();
    }

      hooks[currentComponent] = null;
      currentComponent++;

      // 함수 컴포넌트이면서 클래스 컴포넌트는 아닌 경우
      if (children.length > 0) {
        return tag(makeProps(props, children))
      } else {
        return tag(props);
      }
  } else {
    // 함수 or 클래스 컴포넌트도 아닌 경우
    return { tag, props, children };
  }
}

// hook구현방식 = 이전dom과 업데이트할 dom 비교
export const render = (function() {
  let prevDom = null;

  return function(vdom, container) {
    if (prevDom === null) {
      prevDom = vdom;
    }

    // diff

    container.appendChild(createDOM(vdom));
  }
})();

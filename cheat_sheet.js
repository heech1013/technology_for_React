<Fragment>

/*********************************** JSX *******************************************/
* 컴포넌트 내부 부모 요소가 하나여야 한다.

* Component와 함께 Fragment 태그를 사용하면 div 등의 부모 요소로 감쌀 필요가 없다.

* 조건문: JSX 밖에서 if문을 사용하거나 {} 안에 조건부 삼항 연산자를 사용한다.

* HTML 태그를 닫는다.
<input type="text"/><br/>

/***************************************** CSS ********************************************/
* CSS는 js 객체 형식으로 적용해야 하며, key는 camelCase로 작성한다.
* -mos는 Mos로, -ms는 예외적으로 ms로.

* 요소에 클래스를 지정할 때는 class 대신 className을 사용한다.

/***************************************** etc ********************************************/
* 주석
{ /* 요소 밖에서의 주석 */ } 
<div
// self-closed 태그에서만 작동하는 주석
/* 이렇게도 가능하다. */
// '/>'가 꼭 새 줄에 있어야 한다.
/>

* 크롬 redux 개발자 도구
: createStore(~, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

* path 간략화
  : cross-env 설치, package.json의 "script" 중
  "start": "cross-env NODE_PATH=src react-scripts start",
  "build": "cross-env NODE_PATH=src react-scripts build",
  이렇게 하면 src 폴더 내부의 폴더/파일을 바로 불러올 수 있다. '/components/...'

/***************************************** props ********************************************/
* props 전달 받기
- 클래스형 컴포넌트일 때: this.props.~
- 함수형 컴포넌트일 때: 함수 파라미터로 받는다

* defaultProps 설정
- 방법 1
MyComponent.defaultProps = {
  name: 'default name'
}
- 방법 2
class MyComponent extends Component {
  static defaultProps = {
    name: 'default name'
  }
}

* propTypes 설정 (종류가 많음)
- 방법 1
MyComponent.propTypes = {
  name: PropTypes.string
}
- 방법 2
class MyComponent extends Component {
  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.number.isRequired  // 필수적으로 존재해야 할 때.
  }
}

* 문자열 종류 외의 값을 컴포넌트에 전달할 때는 {}로 감싸야 한다.

* props 설정 시 '=' 가 생략되어 있으면 '={true}' 와 같은 의미이다.
<input readOnly />
<input readOnly={true} />

/***************************************** state ********************************************/
* 기본 값을 미리 설정해야 사용할 수 있다.
- 방법 1
constructor(props) {
  super(props);
  this.state = {
    number: 0
  }
}
- 방법 2
state = {
  number: 0
}

* 직접 접근하여 수정하면 안된다: this.setState()로만 값을 업데이트 한다.
<button onClick={() => {
  this.setState({
    number: this.state.number + 1
  })
}}/>

* 배열인 state를 수정하는 경우 push(배열을 직접 수정) 대신 concat(기존 배열과 새 값을 합친 새 배열을 생성), slice(), 전개연산자(...), filter() 등을 사용한다.
this.setState({
  names: this.state.names.concat(this.state.name)
})

/***************************************** event ********************************************/
* 이벤트 이름은 camelCase로 작성한다.
* 이벤트에 실행할 js 코드를 전달하는 것이 아니라 함수 형태의 값을 전달한다.
* DOM 요소(div, button, input, form 등)에만 이벤트를 설정할 수 있다.

* e 객체: SyntheticEvent(웹 브라우저의 네이티브 이벤트를 감싸는 객체).
e.target.value

* 임의 메서드 만들기
- 방법 1 : 컴포넌트에 임의 메서드를 만들면 기본적으로 this에 접근할 수 없다. 컴포넌트의 생성자 메서드인 constructor에서 각 메서드를 this와 바인딩해 주어야 한다.
constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
}
handleChange(e) {
  this.setState({
    message: e.target.value
  });
}
- 방법 2: 바벨의 transform-class-properties 문법을 사용하여 화살표 함수 형태로 메서드 정의.
handleChange = (e) => {
  this.setState({
    message: e.target.value
  });
}

* 여러 개의 input을 핸들링: e.target.name은 해당 인풋의 name을 가리킨다.
handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

* onKeyPress 이벤트 핸들링
handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    this.handleClick();
  }
}

* e.stopPropagation: 실행하고자 하는 자식 요소의 이벤트와 동일한 이벤트가 부모 요소에도 있어서 실행이 제대로 안될 때 호출
<div onClick={onToggle}>
  <div onClick={(e) => {
    onRemove();
    e.stopPropagation();
  }}>지우기</div>
</div>

* onContextMenu: 마우스 오른쪽 버튼 눌렀을 때 메뉴가 열리는 이벤트.
  e.preventDefault() 함수를 호출하면, 메뉴가 열리는 것을 방지한다.

/***************************************** ref ********************************************/
* 리액트에서 id 대신 DOM에 이름을 다는 방법. id는 컴포넌트 재사용시 중복된 id를 가질 우려가 있는 반면, ref는 컴포넌트 내부에서만 작동한다.

* DOM을 꼭 직접적으로 건드려야 할 때 사용 (특정 input에 포커스 주기, 스크롤 박스 조작하기, Canvas 요소에 그림 그리기 등)
<input ref={(ref) => {this.superman=ref}}></input>
this.superman.focus();

* 컴포넌트에 ref 달기: 컴포넌트 내부의 DOM, 메소드, 멤버 변수에 접근할 때
<MyComponent
  ref={(ref) => {this.myComponent=ref}}
/>
...myComponent.handleClick...
...myComponent.input...
- 주의할 점: 컴포넌트가 처음 렌더링될 때 this.scrollBox가 undefined가 되지 않도록 하기 위해 새로운 함수를 만들어 그 안에 넣는다.
<button onClick={() => this.scrollBox.scrollToBottom()}>맨 밑으로</button>

/***************************************** key ********************************************/
* key값은 언제나 유일해야 한다.

* 배열을 사용하는 경우 index로 설정하면 된다.
const nameList = names.map(
  (name, index) => (<li key={index}>{name}</li>)
)

/***************************************** 함수형 컴포넌트 ********************************************/
* 컴포넌트가 라이프사이클 API와 state를 사용할 필요가 없을 때 (오로지 props를 전달받아 뷰를 렌더링하는 역할만 할 때)
  우선 함수형으로 작성하여, state나 라이프사이클 API를 꼭 써야 할 때만 클래스 형태로 변환한다.
const Hello = ({name}) => {
  return (...)
}

/***************************************** 최적화 ********************************************/
* 어떤 상황에서?
  1. 컴포넌트 배열이 렌더링되는 리스트 컴포넌트일 때
  2. 리스트 컴포넌트 내부에 있는 아이템 컴포넌트일 때
  3. 하위 컴포넌트 개수가 많으며, 리렌더링되지 말아야 할 상황에서도 리렌더링이 진행될 때
* 최적화 방법
  1. 크롬 리액트 개발자 도구 - Highlight Updates 활성화
  2. http://localhost:3000/?react_perf
  3. 크롬 개발자 도구 - Performance
  4. 녹화 버튼을 누른 후 테스트
  5. 녹화 중지 후 User Timing 확인
  6. shouldComponentUpdate
  
/***************************************** 라우트로 사용된 컴포넌트가 전달받는 props ********************************************/
* location: 현재 페이지의 주소 상태
  {
    "pathname": "/posts/3",
    "search": "",  // 주로 search 값으로 URL Query를 읽는 데 사용하거나 주소가 바뀐 것을 감지하는 데 사용.
    "hash": "",
    "key": "xmsczi"
  }
  - 주소가 바뀐 것 감지하기:
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.location !== this.props.location) {
        // 주소가 바뀜
      }
    }

* match: <Route/> 컴포넌트에서 설정한 path와 관련된 데이터들을 조회할 때 사용.
         현재 URL이 같을지라도 다른 라우터에서 사용된 match는 다른 정보를 알려준다.
         주로 params를 조회하거나 서브 라우트를 만들 때 현재 path를 참조하는 데 사용한다.
    (Post.js)
      const Post = ({location, match}) => {
        console.log(match);
      }
    결과: {path:"/posts", url:"/posts", isExact:false, params:{...}}
    
    (Posts.js)
      const Posts = ({match}) => {
        console.log(match);
      }
    결과: {path:"/posts/:id", url:"/posts/3", isExact:true, params:{...}}
  
  * history: 현재 라우트를 조작할 때 사용 (뒤쪽 페이지로 넘어가거나, 다시 앞쪽 페이지로 가거나, 새로운 주소로 이동해야 할 때). 이 객체가 지닌 함수들을 호출
      history: {...}
        action: "POP"
        block: block()
        createHref: createHref()
        go: go()
        goForward: goForward()
        goBack: goBack()
        length: 4
        listen: listen()
        location: {...}
        push: push()
        replace: replace() 
        
      - replace('/posts') 형식으로 작성.
        push와 차이점은 페이지 방문 기록을 남기지 않아서 페이지 이동 후 뒤로가기 버튼을 눌렀을 때 방금 전의 페이지가 아니라
        방금 전의 전 페이지가 나타난다.
      - action: history의 상태를 알려준다. 페이지 처음 방문: POP / 링크를 통한 라우팅 또는 push를 통한 라우팅: PUSH / replace를 통한 라우팅: replace
      - block: 페이지에서 벗어날 때, 사용자에게 정말 페이지를 떠나겠냐고 묻는 창을 띄운다.
          const unblock = history.block('정말로 떠나시겠습니까?');
          unblock();  // 막는 작업을 취소할 때.
      - go, goBack, goForward: 이전 페이지 또는 다음 페이지로 이동하는 함수. go(-1)로 뒤로가기, go(1)로 다음으로 가기 가능.

/***************************************** 라우트로 사용된 컴포넌트가 아닌 기타 컴포넌트에서 라우트 접근(withRouter) ********************************************/
: 라우트로 사용된 컴포넌트가 아닌 기타 컴포넌트에서는 withRouter를 사용하여 위 세가지 props에 접근할 수 있다.

  (src/components/Menu.js)
  import { NavLink, withRouter } from 'react-router-dom';
  ...
  export default withRouter(Menu);

  // withRouter를 사용한 컴포넌트에서 match 값은 현재 해당 컴포넌트가 위치한 상위 라우트의 정보이다.
     주로 history에 접근하여 컴포넌트에서 라우터를 조작하는 데 사용한다.


</Fragment>
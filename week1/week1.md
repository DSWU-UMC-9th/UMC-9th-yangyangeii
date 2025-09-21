# 1주차 내용 정리

# 프로젝트 개요

- TypeScript를 사용해 단일 페이지 ToDoList 앱 구현
- 주요 기능: 할 일 추가, 완료 처리, 삭제, 렌더링
- CSS는 **BEM 네이밍 컨벤션**을 적용해 구조화

# Type 정의

```ts
type Todo = {
  id: number;
  text: string;
  done: boolean;
};

- id: 고유 번호 (자동 증가)
- text: 할 일 내용
- done: 완료 여부 (true/false)
```

# 할 일 추가

- 입력값 받아 새로운 Todo 객체 생성
- 배열 맨 앞에 추가해 최신 항목이 위로 오도록 구성
- Enter 키 입력 시도 동일하게 동작
- 추가 후 input 초기화 및 focus 유지

const newTodo: Todo = { id: idCounter++, text, done: false };
todos = [newTodo, ...todos];

# 완료 처리

- 특정 id의 done 값을 true로 변경
- 완료 목록으로 자동 이동

function markDone(id: number) {
todos = todos.map((t) => (t.id === id ? { ...t, done: true } : t));
}

# 삭제 기능

- 완료된 항목을 배열에서 제거
- 삭제 버튼은 빨간색(background:#b22222)으로 표시

function deleteTodo(id: number) {
todos = todos.filter((t) => t.id !== id);
}

# 렌더링

- todos 배열을 기준으로 할 일과 완료 항목을 각각 다시 그림
- 버튼 이벤트 바인딩으로 완료/삭제 동작 연결

# BEM 스타일 네이밍

- Block: .todo
- Element: .todo**title, .todo**item, .todo\_\_btn
- Modifier: .todo\_\_btn--danger (삭제 버튼 변형 상태)

- 장점
  - 클래스 이름만 봐도 역할이 명확
  - CSS 충돌 최소화
  - 유지보수와 확장성에 유리

# 배운 점

- TypeScript로 DOM 요소에 정확한 타입(HTMLInputElement, HTMLButtonElement, HTMLUListElement)을 지정
- map, filter를 활용한 불변 패턴 상태 업데이트 학습
- BEM 네이밍으로 CSS 구조를 체계적으로 관리
- JS보다 엄격한 TS 덕분에 오류를 사전에 차단하고 코드 가독성 향상

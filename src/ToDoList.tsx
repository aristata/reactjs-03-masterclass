import { useState } from "react";

/**
 * 일반적인 방법으로 투두 리스트를 만든다면, 아래와 같이 만들 수 있다
 * 데이터가 저장될 스테이트를 선언하고, 데이터를 입력받을 인풋, 데이터를 변경할 이벤트 등을 구현해야 한다
 */
const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={toDo}
          placeholder={"할 일을 입력하세요"}
        />
        <button>추가하기</button>
      </form>
    </div>
  );
};

export default ToDoList;

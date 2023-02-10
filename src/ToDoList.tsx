import { useState } from "react";
import { useForm } from "react-hook-form";

/**
 * 일반적인 방법으로 투두 리스트를 만든다면, 아래와 같이 만들 수 있다
 * 데이터가 저장될 스테이트를 선언하고, 데이터를 입력받을 인풋, 데이터를 변경할 이벤트 등을 구현해야 한다
 */
const ToDoList = () => {
  /* const [toDo, setToDo] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  }; */

  /**
   * react-hook-form 을 사용하면, 위의 같은 절차들을 간소화 할 수 있다
   * 사용하는 방법은 useForm 훅을 사용하는 것이다
   * 해당 훅을 사용하면 다양한 기능들을 하는 함수 또는 상태들을 리턴받을 수 있다
   * register 는 폼을 등록하는 함수 이다
   * watch 는 폼의 데이터를 조회하는 함수 이다
   */
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("email")} placeholder={"email 을 입력하세요"} />
        <input
          {...register("firstName")}
          placeholder={"firstName 을 입력하세요"}
        />
        <input
          {...register("lastName")}
          placeholder={"lastName 을 입력하세요"}
        />
        <input
          {...register("userName")}
          placeholder={"userName 을 입력하세요"}
        />
        <input
          {...register("password")}
          placeholder={"password 을 입력하세요"}
        />
        <input
          {...register("passwordConfirm")}
          placeholder={"passwordConfirm 을 입력하세요"}
        />
        <button>추가하기</button>
      </form>
    </div>
  );
};

export default ToDoList;

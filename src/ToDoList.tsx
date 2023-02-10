import { useState } from "react";
import { useForm } from "react-hook-form";

const ToDoList = () => {
  // handleSubmit(성공, 실패)
  // 첫번째 인자로 성공시 실행할 함수를 받는다
  // 두번째 인자는 실패시 실행할 함수인데, 선택사항이다
  // 폼이 제출(submit) 되었을 때, 모든 밸리데이션이 통과되었다면, 성공 함수를 실행한다
  // 밸리데이션이 하나라도 통과되지 못했다면, 실패 함수가 실행된다

  // formState
  // 현재 폼의 상태를 확인할 수 있다
  const { register, handleSubmit, formState } = useForm();
  const onValid = (formData: any) => {
    console.log(formData);
  };
  console.log(formState.errors);

  // validation 은 register 의 두번째 인자로 넣을 수 있다
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", { required: true, minLength: 5 })}
          placeholder={"email 을 입력하세요"}
        />
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
          {...register("password", {
            required: "비밀번호는 필수값 입니다",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다"
            }
          })}
          placeholder={"password 을 입력하세요"}
        />
        <input
          {...register("passwordConfirm", { required: true, minLength: 5 })}
          placeholder={"passwordConfirm 을 입력하세요"}
        />
        <button>추가하기</button>
      </form>
    </div>
  );
};

export default ToDoList;

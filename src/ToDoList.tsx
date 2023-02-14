import { useForm } from "react-hook-form";

interface Form {
  email: string;
  firstName?: string;
  lastName: string;
  userName: string;
  password: string;
  passwordConfirm: string;
  extraErrors?: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Form>({
    defaultValues: {
      email: "@gmail.com"
    }
  });
  const onValid = (formData: Form) => {
    if (formData.password !== formData.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "패스워드가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }

    // setError("extraErrors", { message: "server offline" });

    console.log(formData);
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "email 을 입력해 주세요.",
            pattern: {
              value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
              message: "이메일 형식에 맞게 입력해 주세요. 예) abc@gmail.com"
            }
          })}
          placeholder={"abc@gmail.com"}
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName")}
          placeholder={"firstName 을 입력하세요"}
        />
        <input
          {...register("lastName", {
            required: "lastName 은 필수값 입니다.",
            validate: {
              noSlang: (value) =>
                value.includes("개") ? "비속어를 사용하실 수 없습니다" : true,
              noCat: (value) =>
                value.includes("고양이")
                  ? "고양이 대신 고영희를 사용하세요"
                  : true
            }
          })}
          placeholder={"lastName 을 입력하세요"}
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("userName", {
            required: "userName 을 입력해 주세요.",
            minLength: {
              value: 3,
              message: "userName 은 최소 3글자이상 입력해야 합니다."
            },
            maxLength: {
              value: 15,
              message: "userName 은 최대 15글자이하 입력해야 합니다."
            }
          })}
          placeholder={"userName 을 입력하세요"}
        />
        <span>{errors?.userName?.message}</span>
        <input
          {...register("password", {
            required: "비밀번호는 필수값 입니다",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다"
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message:
                "비밀번호는 숫자, 소문자, 대문자 를 포함한 8자리 이상이어야 합니다"
            }
          })}
          placeholder={"password 을 입력하세요"}
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("passwordConfirm", {
            required: "비밀번호 확인은 필수값 입니다"
          })}
          placeholder={"passwordConfirm 을 입력하세요"}
        />
        <span>{errors?.passwordConfirm?.message}</span>
        <button>추가하기</button>
      </form>
    </div>
  );
};

export default ToDoList;

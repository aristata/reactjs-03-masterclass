import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  width: 600px;
  height: 500px;
  border: 1px solid #212529;
  border-radius: 20px;
  margin: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 8px;
`;

const InputArea = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
`;

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
`;

const Label = styled.span`
  font-size: 20px;
  font-family: "Cafe24Ssurround";
`;

const Input = styled.input`
  padding: 8px;
  border: 0.5px solid #dee2e6;
  border-radius: 10px;
  height: 30px;
  font-family: "Pretendard-Regular";
`;

const Required = styled.span`
  color: #f03e3e;
  font-size: 12px;
`;

const ErrorMessage = styled.span`
  margin-left: 30%;
  color: #f03e3e;
  font-size: 12px;
`;

const Button = styled.button`
  height: 50px;
  border-radius: 10px;
  background-color: #b2f2bb;
  color: #212529;
  border: none;
  box-shadow: 1px 4px 0 #adb5bd;
  &:hover {
    cursor: pointer;
    color: #495057;
    opacity: 0.8;
  }
  &:active {
    box-shadow: 1px 1px 0 #2f9e44;
    position: relative;
    top: 3px;
  }
`;

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
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <Container>
          <InputArea>
            <LabelArea>
              <Label>email</Label>
              <Required>*</Required>
            </LabelArea>
            <Input
              {...register("email", {
                required: "email 을 입력해 주세요.",
                pattern: {
                  value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
                  message: "이메일 형식에 맞게 입력해 주세요. 예) abc@gmail.com"
                }
              })}
              placeholder={"abc@gmail.com"}
            />
          </InputArea>
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          <InputArea>
            <LabelArea>
              <Label>first name</Label>
            </LabelArea>
            <Input {...register("firstName")} />
          </InputArea>
          <ErrorMessage>{errors?.firstName?.message}</ErrorMessage>
          <InputArea>
            <LabelArea>
              <Label>last name</Label>
              <Required>*</Required>
            </LabelArea>
            <Input
              {...register("lastName", {
                required: "lastName 은 필수값 입니다.",
                validate: {
                  noSlang: (value) =>
                    value.includes("개")
                      ? "비속어를 사용하실 수 없습니다"
                      : true,
                  noCat: (value) =>
                    value.includes("고양이")
                      ? "고양이 대신 고영희를 사용하세요"
                      : true
                }
              })}
              placeholder={"lastName 을 입력하세요. 개와 고양이는 출입 금지!"}
            />
          </InputArea>
          <ErrorMessage>{errors?.lastName?.message}</ErrorMessage>
          <InputArea>
            <LabelArea>
              <Label>user name</Label>
              <Required>*</Required>
            </LabelArea>
            <Input
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
              placeholder={"3글자 ~ 15글자 닉네임을 입력해 주세요."}
            />
          </InputArea>
          <ErrorMessage>{errors?.userName?.message}</ErrorMessage>
          <InputArea>
            <LabelArea>
              <Label>password</Label>
              <Required>*</Required>
            </LabelArea>
            <Input
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
              placeholder={
                "비밀번호는 숫자, 소문자, 대문자 를 포함한 8자리 이상이어야 합니다"
              }
            />
          </InputArea>
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          <InputArea>
            <LabelArea>
              <Label style={{ display: "flex", flexDirection: "column" }}>
                <span>password</span>
                <span>confirm</span>
              </Label>
              <Required>*</Required>
            </LabelArea>
            <Input
              {...register("passwordConfirm", {
                required: "비밀번호 확인은 필수값 입니다"
              })}
              placeholder={"비밀번호를 다시 한 번 입력해 주세요."}
            />
          </InputArea>
          <ErrorMessage>{errors?.passwordConfirm?.message}</ErrorMessage>
          <Button>추가하기</Button>
        </Container>
      </form>
    </div>
  );
};

export default ToDoList;

import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ToDoData, toDoState } from "../atoms/todos";

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`;

const ToDoSpan = styled.span`
  font-family: "Cafe24Ssurround";
  font-size: 16pt;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CategoryButton = styled.button`
  margin-left: 4px;
`;

const DeleteButton = styled.div`
  margin-left: 4px;
  width: 25px;
  height: 25px;
`;

const ToDo = ({ text, category, id }: ToDoData) => {
  const setToDos = useSetRecoilState(toDoState);
  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {
        id,
        category: name as Categories,
        text
      };
      const newToDoList = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ];
      // 로컬스토리지에 저장
      localStorage.setItem("ToDoList", JSON.stringify(newToDoList));
      return newToDoList;
    });
  };
  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDoList = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1)
      ];
      // 로컬스토리지에 저장
      localStorage.setItem("ToDoList", JSON.stringify(newToDoList));
      return newToDoList;
    });
  };
  return (
    <li>
      <Box>
        <ToDoSpan>{text}</ToDoSpan>
        <ButtonArea>
          {category !== Categories.DOING && (
            <CategoryButton name={Categories.DOING} onClick={changeCategory}>
              진행 중
            </CategoryButton>
          )}
          {category !== Categories.TO_DO && (
            <CategoryButton name={Categories.TO_DO} onClick={changeCategory}>
              할 일
            </CategoryButton>
          )}
          {category !== Categories.DONE && (
            <CategoryButton name={Categories.DONE} onClick={changeCategory}>
              완료
            </CategoryButton>
          )}
          <DeleteButton onClick={deleteToDo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </DeleteButton>
        </ButtonArea>
      </Box>
    </li>
  );
};

export default ToDo;

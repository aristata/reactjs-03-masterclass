import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ToDoData, toDoState } from "../atoms/todos";

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
`;

const ToDoSpan = styled.span``;

const CategoryButton = styled.button`
  margin-left: 4px;
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
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ];
    });
  };
  return (
    <li>
      <Box>
        <ToDoSpan>{text}</ToDoSpan>
        <div>
          {category !== Categories.DOING && (
            <CategoryButton name={Categories.DOING} onClick={changeCategory}>
              Doing
            </CategoryButton>
          )}
          {category !== Categories.TO_DO && (
            <CategoryButton name={Categories.TO_DO} onClick={changeCategory}>
              To Do
            </CategoryButton>
          )}
          {category !== Categories.DONE && (
            <CategoryButton name={Categories.DONE} onClick={changeCategory}>
              Done
            </CategoryButton>
          )}
        </div>
      </Box>
    </li>
  );
};

export default ToDo;

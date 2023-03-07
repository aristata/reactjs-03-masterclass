import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ToDoData, toDoSelector, toDoState } from "../atoms/todos";
import CreateToDo from "../components/CreateToDo";
import SelectCategory from "../components/SelectCategory";
import ToDo from "../components/ToDo";

/**
 * color pallet
 *
 * #EDF1D6 #9DC08B #609966 #40513B
 */

const Container = styled.div`
  width: 700px;
  height: 800px;
  border: 1px solid #40513b;
  display: grid;
  grid-template-rows: 60px 1fr 60px;
  margin: auto;
  margin-top: 16px;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid #40513b;
`;

const ContentArea = styled.div`
  padding: 8px;
`;

const EmptyContentArea = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputArea = styled.div`
  width: 100%;
  border-top: 1px solid #40513b;
`;

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const setToDos = useSetRecoilState(toDoState);

  useEffect(() => {
    const savedData = localStorage.getItem("ToDoList");
    if (savedData !== null) {
      const savedToDoList = JSON.parse(savedData) as ToDoData[];
      setToDos(savedToDoList);
    }
  }, [setToDos]);

  return (
    <Container>
      <TitleArea>
        <SelectCategory />
      </TitleArea>
      <ContentArea>
        {toDos.length > 0 ? (
          <ul>
            {toDos.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        ) : (
          <EmptyContentArea>
            <p>없습니다</p>
          </EmptyContentArea>
        )}
      </ContentArea>
      <InputArea>
        <CreateToDo />
      </InputArea>
    </Container>
  );
};

export default ToDoList;

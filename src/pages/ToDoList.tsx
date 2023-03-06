import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, toDoCategoryState, toDoSelector } from "../atoms/todos";
import CreateToDo from "../components/CreateToDo";
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
`;

const TitleArea = styled.h1`
  p {
    font-size: 16pt;
    text-align: center;
    margin-top: 16px;
  }
  border-bottom: 1px solid #40513b;
`;

const ContentArea = styled.div``;

const InputArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(toDoCategoryState);
  const onChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  return (
    <Container>
      <TitleArea>
        <p>할 일 목록</p>
      </TitleArea>
      <ContentArea>
        {toDos.length > 0 ? (
          <ul>
            {toDos.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        ) : (
          <>
            <p>없습니다</p>
          </>
        )}
      </ContentArea>
      <InputArea>
        <select
          value={category}
          onChange={onChangeHandler}
          style={{ width: "200px", height: "60px" }}
        >
          <option value={Categories.TO_DO}>해야할 일</option>
          <option value={Categories.DOING}>하는중인 일</option>
          <option value={Categories.DONE}>다한 일</option>
        </select>
        <CreateToDo />
      </InputArea>
    </Container>
  );
};

export default ToDoList;

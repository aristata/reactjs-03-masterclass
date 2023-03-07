import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, toDoCategoryState } from "../atoms/todos";

const Select = styled.select`
  width: 150px;
  height: 60px;
  border: none;
  border-bottom: 1px solid #40513b;
`;

const SelectCategory = () => {
  const [category, setCategory] = useRecoilState(toDoCategoryState);
  const onChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };

  return (
    <Select value={category} onChange={onChangeHandler}>
      <option value={Categories.TO_DO}>해야할 일</option>
      <option value={Categories.DOING}>하는중인 일</option>
      <option value={Categories.DONE}>다한 일</option>
    </Select>
  );
};

export default SelectCategory;

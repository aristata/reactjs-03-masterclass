import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "../atoms/minutes";

const TimeConvertor = () => {
  const [minute, setMinute] = useRecoilState(minuteState);
  const [hour, setHour] = useRecoilState(hourSelector);

  const changeMinute = (event: React.FormEvent<HTMLInputElement>) => {
    setMinute(+event.currentTarget.value);
  };

  const changeHour = (event: React.FormEvent<HTMLInputElement>) => {
    setHour(+event.currentTarget.value);
  };
  return (
    <div>
      <label htmlFor={"minuteInput"}>minute: </label>
      <input
        id={"minuteInput"}
        type={"number"}
        value={minute}
        onChange={changeMinute}
      ></input>
      <label htmlFor={"hourInput"}>hour: </label>
      <input
        id={"hourInput"}
        type={"number"}
        value={hour}
        onChange={changeHour}
      ></input>
    </div>
  );
};

export default TimeConvertor;

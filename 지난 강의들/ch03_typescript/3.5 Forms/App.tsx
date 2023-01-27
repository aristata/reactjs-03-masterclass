import React from "react";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // 타입스크립트에서는 가능한 any 대신에 구체적인 타입을 명시해야 한다
    const {
      currentTarget: { value }
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Hello ${value}`);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        placeholder="Input your name"
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;

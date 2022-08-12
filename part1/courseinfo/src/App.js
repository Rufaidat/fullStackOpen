import { useState } from "react";
const Display = (props) => {
  return <div>{props.counter}</div>;
};
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const App = () => {
  const [counter, setCounter] = useState(0);
  const plus1 = () => setCounter(counter + 1);
  const minus1 = () => setCounter(counter - 1);
  const reset = () => setCounter(0);
  return (
    <div>
      <Display counter={counter} />
      <Button onClick={plus1} text="plus" />
      <Button onClick={minus1} text="minus" />
      <Button onClick={reset} text="reset" />
    </div>
  );
};

export default App;

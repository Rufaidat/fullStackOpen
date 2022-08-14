import { useState } from "react";
const Heading = (props) => <h1>{props.text}</h1>;

const StatisticLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td>{props.text} </td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  </table>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGoodClick = () => {
    setAll(all + 1);
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setAll(all + 1);
    setBad(bad + 1);
  };

  const Statistics = (props) => {
    if (props.total === 0) {
      return <div>No Feedback given</div>;
    }
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine
          text="average"
          value={(good * 1 + neutral * 0 + bad * -1) / 3}
        />
        <StatisticLine text="positive" value={`${(good / all) * 100}%`} />
      </div>
    );
  };

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Heading text="statistics" />
      <Statistics total={all} />
    </div>
  );
};
export default App;

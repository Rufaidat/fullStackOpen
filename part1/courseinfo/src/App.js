const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.part["parts"][0]["name"]}
        number={props.part["parts"][0]["exercises"]}
      />
      <Part
        part={props.part["parts"][1]["name"]}
        number={props.part["parts"][1]["exercises"]}
      />
      <Part
        part={props.part["parts"][2]["name"]}
        number={props.part["parts"][2]["exercises"]}
      />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      {props.part} {props.number}
    </div>
  );
};

const Total = (props) => (
  <div>
    Number of exercises{" "}
    {props.total["parts"][0]["exercises"] +
      props.total["parts"][1]["exercises"] +
      props.total["parts"][2]["exercises"]}
  </div>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course["name"]} />
      <Content part={course} />
      <Total total={course} />
    </div>
  );
};

export default App;

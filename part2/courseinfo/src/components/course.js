import React from "react";
import Header from "./header";
import Total from "./total";
import Parts from "./part";
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Parts course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;

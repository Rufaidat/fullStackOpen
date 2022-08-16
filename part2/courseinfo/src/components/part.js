import React from "react";

const Parts = ({ course }) =>
  course.parts.map((elem) => (
    <p key={elem.id}>
      {elem["name"]} {elem["exercises"]}
    </p>
  ));

export default Parts;

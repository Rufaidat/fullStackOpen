import React from 'react'

const Total = ({ course }) => (
    <h3>
      total of {course.parts.reduce((sum, value) => (sum += value.exercises), 0)}{" "}
      exercises
    </h3>
  );

export default Total
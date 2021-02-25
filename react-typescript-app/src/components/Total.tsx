import React from "react";
import { Part } from '../interfaces/Part';

interface TotalProps {
  courseParts: Part[];
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total;
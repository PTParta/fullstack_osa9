import React from "react";
import { PartInterface } from '../interfaces/Part';

interface TotalProps {
  courseParts: PartInterface[];
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>
      <br></br>
      <p>
        <strong>Total number of exercises{" "}
          {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </strong>
      </p>
    </div>
  )
}

export default Total;
import React from "react";
import { CoursePart } from "../types";

const Part: React.FC<CoursePart> = props => {
  switch (props.name) {
    case "Fundamentals":
      return (
        <div>
          <br></br>
          <h3>
            {props.name}
          </h3>
          <p>
            description: {props.description}
          </p><p>
            exercises: {props.exerciseCount}
          </p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <br></br>
          <h3>
            {props.name}
          </h3>
          <p>
            projects: {props.groupProjectCount}
          </p>
          <p>
            exercises: {props.exerciseCount}
          </p>
        </div>

      );
    case "Deeper type usage":
      return (
        <div>
          <br></br>
          <h3>
            {props.name}
          </h3>
          <p>
            description: {props.description}
          </p>
          <p>
            exercise submission link: {props.exerciseSubmissionLink}
          </p>
          <p>
            exercises: {props.exerciseCount}
          </p>
        </div>
      );
    case "My own course part interface":
      return (
        <div>
          <br></br>
          <h3>
            {props.name}
          </h3>
          <p>
            description: {props.description}
          </p>
          <p>
            exercises: {props.exerciseCount}
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default Part;
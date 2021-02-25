import React from "react";
import { Part } from '../interfaces/Part';

interface ContentProps {
  courseParts: Part[];
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.courseParts.map(course =>
        <div key={course.name}>
          <p>
            {course.name} {course.exerciseCount}
          </p>
        </div>
      )}
    </div>
  )
}

export default Content;
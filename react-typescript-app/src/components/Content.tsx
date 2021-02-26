import React from "react";
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.courseParts.map((part, i) => (
        <Part key={i} {...part} />
      ))}
    </div>
  )
}

export default Content;
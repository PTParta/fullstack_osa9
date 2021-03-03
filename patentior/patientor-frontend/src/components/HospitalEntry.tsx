import React from "react";
import { Entry } from '../types';
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();

  switch (entry.type) {
    case "Hospital":
      return (
        <div style={
          {
            border: '1px solid black',
            marginBottom: '20px',
            padding: '10px'
          }
        }>
          <h3>{entry.date} <Icon name="hospital outline" /></h3>
          <p>specialist: {entry.specialist}</p>
          <p>description: {entry.description}</p>
          <p></p>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((diagnosisCode: string) => (
              <ul key={diagnosisCode}>
                <li>{diagnosisCode} {diagnoses[diagnosisCode].name}</li>
              </ul>
            ))
            : <></>}
          <p>discharge date: {entry.discharge.date}</p>
          <p>discharge reason: {entry.discharge.criteria}</p>
        </div>
      );
    default:
      return null;
  }
};

export default HospitalEntry;

//user md = healthcheck
//stethoscope = occupational
//hospital outline = hospital
import React from "react";
import { /* Diagnosis, */ Entry } from "../types";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";


const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();
  switch (entry.type) {

    case "OccupationalHealthcare":
      return (
        <div style={
          {
            border: '1px solid black',
            marginBottom: '20px',
            padding: '10px'
           }
        }>
          <h3>{entry.date} <Icon name="stethoscope" /> {entry.employerName}</h3>
          <p>specialist: {entry.specialist}</p>
          <p>description: {entry.description}</p>

          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((diagnosisCode: string) => (
              <ul key={diagnosisCode}>
                <li>{diagnosisCode} {diagnoses[diagnosisCode].name}</li>
              </ul>
            ))
            : <></>}
          {entry.sickLeave &&
            <div>
              <p>sick leave start date {entry.sickLeave.startDate}</p>
              <p>sick leave end date {entry.sickLeave.endDate}</p>
            </div>}
        </div>
      );

    default:
      return null;
  }
};


export default OccupationalHealthcareEntry;
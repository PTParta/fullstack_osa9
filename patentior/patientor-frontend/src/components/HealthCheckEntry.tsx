import React from "react";
import { Entry } from '../types';
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";


const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();

  const setHeartColor = (healthCheckRating: number) => {
    if (healthCheckRating === 0) {
      return "green";
    }
    if (healthCheckRating === 1) {
      return "yellow";
    }
    if (healthCheckRating === 2) {
      return "orange";
    }
    if (healthCheckRating === 3) {
      return "red";
    }
  };

  switch (entry.type) {

    case "HealthCheck":
      return (
        <div style={
          {
           border: '1px solid black',
           marginBottom: '20px',
           padding: '10px'
          }
        }>
          <h3>{entry.date} <Icon name="user md" /></h3>
          <p>specialist: {entry.specialist}</p>
          <p>description: {entry.description}</p>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((diagnosisCode: string) => (
              <ul key={diagnosisCode}>
                <li>{diagnosisCode} {diagnoses[diagnosisCode].name}</li>
              </ul>
            ))
            : <></>}
          <Icon name="heart" color={setHeartColor(entry.healthCheckRating)} />
        </div>
      );
    default:
      return null;
  }
};
export default HealthCheckEntry;
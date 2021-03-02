import React from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Icon } from "semantic-ui-react";


const setGenderIcon = (gender: "female" | "male" | "other") => {
  switch (gender) {
    case "female":
      return "venus";
    case "male":
      return "mars";
    case "other":
      return "genderless";
  }
};

const PatientFullData: React.FC = () => {
  console.log("patient sivu");
  const [{ patientsWithSSN }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log('patient from api', patientFromApi);
        dispatch({ type: "SET_PATIENTS_WITH_SSN", payload: patientFromApi });
      } catch (e) {
        console.log(e);
      }
    };
    const patientsInAList = Object.values(patientsWithSSN).map((p: Patient) => p);
    //console.log('nonStatePatients', nonStatePatients);

    const foundPatient = patientsInAList.find((p: Patient) => p.id === id);
    console.log('found patient from state', foundPatient);
    if (!foundPatient) {
      fetchPatient();
    }
  }, [patientsWithSSN, id, dispatch]);

  const nonStatePatients = Object.values(patientsWithSSN).map((p: Patient) => p);
  const patient = nonStatePatients.find((p: Patient) => p.id === id);

  return (
    <div>
      {patient
        ? <div>
          <h1>{patient.name} <Icon name={setGenderIcon(patient.gender)} /></h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
        : <></>}

    </div>
  );

};

export default PatientFullData;

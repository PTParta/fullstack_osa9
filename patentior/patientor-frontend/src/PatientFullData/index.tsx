import React from "react";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { setPatientWithSnnList } from "../state";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { /* Container, Table, */ Button } from "semantic-ui-react";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";


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
  const [{ patientsWithSSN/* , diagnoses */ }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log('adding a new entry');
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      //dispatch({ type: "ADD_PATIENT", payload: newPatient });
      //dispatch(addEntry(newEntry));
      closeModal();
      const patientsInAList = Object.values(patientsWithSSN).map((p: Patient) => p);
      const foundPatient: Patient | undefined = patientsInAList.find((p: Patient) => p.id === id);

      if (foundPatient) {
        foundPatient.entries.push(newEntry);
        dispatch(setPatientWithSnnList(foundPatient));
      }

    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }

    //dispatch(setPatientWithSnnList(patientFromApi)
  };

  React.useEffect(() => {

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log('patient from api', patientFromApi);
        //dispatch({ type: "SET_PATIENTS_WITH_SSN", payload: patientFromApi });
        dispatch(setPatientWithSnnList(patientFromApi));
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
          <h3>entries</h3>

          {Object.values(patient.entries).map((entry: Entry) => (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
            </div>))}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
        : <></>}

    </div>
  );

};

export default PatientFullData;

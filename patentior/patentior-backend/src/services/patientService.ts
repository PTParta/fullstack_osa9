import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';
import { toNewPatient } from '../utils';
import { NewEntry, Entry } from '../types';
//console.log(patientData);
//const patients: Array<Patient> = patientData;
//const id = uuid();

let patients: Patient[] = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient
  object.id = obj.id
  object.entries = obj.entries
  return object
})

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensiticePatients = (): NonSensitivePatient[] => {

  /* const nonSensitivePatients = patients.map(({ name, dateOfBirth, gender, occupation, entries }) => ({
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  })); */

  //console.log(nonSensitivePatients)

  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatient): Patient => {

  const newPatient = {
    id: uuid(),
    ...entry
  }
  console.log('new patient:', newPatient);
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const patient = patients.find((p: Patient) => p.id === id);
  if (patient) {
    patient.entries.push(entry);
    patients = patients.map((p: Patient) => p.id === id ? patient : p);
  }
return entry;
}

export default {
  getPatients,
  addPatient,
  getNonSensiticePatients,
  addEntry
};
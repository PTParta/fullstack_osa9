import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';
import toNewPatient from '../utils';

//const patients: Array<Patient> = patientData;
//const id = uuid();

const patients: Patient[] = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient
  object.id = obj.id
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

export default {
  getPatients,
  addPatient,
  getNonSensiticePatients
};
import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensiticePatients = (): NonSensitivePatient[] => {

  const nonSensitivePatients = patients.map(({ name, dateOfBirth, gender, occupation }) => ({
    name,
    dateOfBirth,
    gender,
    occupation
  }));

  console.log(nonSensitivePatients)

  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
  getNonSensiticePatients
};
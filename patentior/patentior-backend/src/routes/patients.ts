import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  //res.send('Fetching all diagnoses!');
  res.send(patientService.getNonSensiticePatients());
})

router.get('/:id', (req, res) => {
  console.log('getting one person with id', req.params.id);
  const patients = patientService.getPatients();
  const patient = patients.find(p => p.id === req.params.id)
  res.send(patient);
})

router.post('/', (req, res) => {

  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }

  //const {name, dateOfBirth, ssn, gender, occupation} = req.body;
  /* const newPatient = req.body;
  const patient = patientService.addPatient(newPatient);
  res.json(patient); */
  /*  patientService.addPatient(
     name, 
     dateOfBirth, 
     ssn, 
     gender,
     occupation
   ); */
});

router.post('/:id/entries', (req, res) => {

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

export default router;

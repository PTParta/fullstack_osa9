import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  //res.send('Fetching all diagnoses!');
  res.send(patientService.getNonSensiticePatients());
})

/* router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
}) */

export default router;
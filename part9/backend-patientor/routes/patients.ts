import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSsnEntries();
  // console.log(patients);
  res.send(patients);
  // res.send('Fetech all patients');
});

router.post('/', (_req, res) => {
  res.send('Saving a patient');
});

export default router;
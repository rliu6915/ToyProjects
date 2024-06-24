import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSsnEntries();
  // console.log(patients);
  res.send(patients);
  // res.send('Fetech all patients');
});

router.post('/', (req, res) => {

  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name, 
    dateOfBirth, 
    ssn,
    gender,
    occupation
  });
  res.json(addedPatient);
  // res.send('Saving a patient');
});

export default router;
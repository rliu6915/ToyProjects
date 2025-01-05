import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSsnEntries();
  // console.log(patients);
  res.send(patients);
  // res.send('Fetech all patients');
});

router.post('/', (req, res) => {
  try {
    // parse and validate the request body
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
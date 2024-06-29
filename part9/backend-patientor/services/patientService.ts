/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import patientData from "../data/patients";
import { NewPatientEntry, PatientEntry, NonSsnPatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

const getEntries = () : PatientEntry[] => {
  console.log(patientData);
  return patientData;
};

const getNonSsnEntries = () : NonSsnPatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry
  };

  patientData.push(newPatientEntry);
  console.log(patientData);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSsnEntries,
  addPatient
};
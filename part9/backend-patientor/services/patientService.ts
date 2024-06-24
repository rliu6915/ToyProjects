
import patientData from "../data/patients";
import { NewPatientEntry, PatientEntry, NonSsnPatientEntry } from "../types";

const getEntries = () : PatientEntry[] => {
  return patientData;
};

const getNonSsnEntries = () : NonSsnPatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: (Math.max(...patientData.map(d => Number(d.id))) + 1).toString(),
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSsnEntries,
  addPatient
};
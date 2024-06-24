
import patientData from "../data/patients";
import { PatientEntry, NonSsnPatientEntry } from "../types";

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

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  getNonSsnEntries,
  addPatient
};
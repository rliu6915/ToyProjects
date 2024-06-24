import diagnoseData from "../data/diagnoses";

import { DiagnosisEntry } from "../types";

const diagnosis : DiagnosisEntry[] = diagnoseData;

const getEntries = () : DiagnosisEntry[] => {
  return diagnosis;
};

const addDiagnose = () => {
  return null;
};

export default {  
  getEntries,
  addDiagnose
};
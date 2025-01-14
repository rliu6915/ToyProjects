export interface DiagnosisEntry {
  code: string; 
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// export type Gender = 'male' | 'female' | 'other';
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NonSsnPatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
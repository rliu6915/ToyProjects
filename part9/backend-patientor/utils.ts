import { NewPatientEntry, Gender } from './types';

// Type guards

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// const isGender = (str: string): str is Gender => {
//   return ['male', 'female', 'other'].includes(str);
// };

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

// Parsing functions

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// validate the new patient entry

// const toNewPatientEntry = (object: unknown): NewPatientEntry => {
//   const newEntry: NewPatientEntry = {
//     name: parseName(object.name),
//     dateOfBirth: parseDate(object.dateOfBirth),
//     ssn: parseSsn(object.ssn),
//     gender: parseGender(object.gender),
//     occupation: parseOccupation(object.occupation),
//   };

//   return newEntry;
// };

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 
    'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
  
    return newEntry;
  }

  throw new Error('Some fields are missing or incorrect');
};

export default toNewPatientEntry;
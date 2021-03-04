import { NewPatient, Gender, NewEntry, BaseEntry, /* HealthCheckEntry, */ OccupationalHealthCareEntry/* , HospitalEntry */ } from './types';
import { v1 as uuid } from 'uuid';
//import { assertNever } from "assert-never";

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: []
  }
}

export const toNewEntry = (object: any): NewEntry => {
  if (!object.type || !isType(object.type)) {
    throw new Error('Incorrect or missing type: ' + object.type);
  }
  const entryBase: BaseEntry = {
    id: uuid(),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist)
  };

  if (object.diagnosisCodes) {
    entryBase.diagnosisCodes = object.diagnosisCodes
  }

  switch (object.type) {
    case "HealthCheck":
      return {
        ...entryBase,
        type: "HealthCheck",
        healthCheckRating: parseNumber(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      const entryOccupational: OccupationalHealthCareEntry = {
        ...entryBase,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName)
      }
      if (object.sickLeave) {
        entryOccupational.sickLeave = object.sickLeave;
      }
      return entryOccupational;
    case "Hospital":
      return {
        ...entryBase,
        type: "Hospital",
        discharge: object.discharge
      };
    default:
      //return assertNever(object.type);
      return object;
  }
};

const isType = (type: any): boolean => {
  if (type === "HealthCheck" || type === "OccupationalHealthcare" || type === "Hospital") {
    return true;
  } else {
    return false;
  }
}

const parseNumber = (number: any): number => {
  if (number === 0 || number === "0" ||
    number === 1 || number === "1" ||
    number === 2 || number === "2" ||
    number === 3 || number === "3") {
    return Number(number);
  } else {
    throw new Error('Incorrect or missing health check rating: ' + number);
  }

  /* const num = Number(number);
  console.log("num", num);
  if (!number || !(number === "0" || number === "1" || number === "2" || number === "3")) {
    throw new Error('Incorrect or missing health check rating: ' + number);
  }
  return number; */
}

/* const parseType = (type: any):String => {
  if(!type || !(type === "Healthcheck" || type === "OccupationalHealthcare" || type === "Hospital")){
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
} */

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
}

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing name: ' + employerName);
  }
  return employerName;
}

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
}

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
}

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
}

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
}

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}

/* const isNumber = (number: any): number is number => {
  return typeof number === 'number' || number instanceof Number;
} */

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

//export default { toNewPatient, toNewEntry };
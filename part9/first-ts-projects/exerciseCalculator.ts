// import { parseArguments } from './utils';

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

// interface CalculateValues {
//   target: number,
//   trainingHours: Array<number>
// }

export const calculateExercises = (trainingHours : Array<number>, target : number) : Result => {
  // const trainingDays = 3;
  // const periodLength = trainingHours.length;
  const periodLength = trainingHours.length;
  const trainingDays = trainingHours.filter(h => h > 0).length;
  const average = trainingHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating = 0;
  let ratingDescription = '';
  if (average < target) {
    rating = 1;
    ratingDescription = 'not too bad but could be better';
  } else if (average === target) {
    rating = 2;
    ratingDescription = 'good job';
  } else {
    rating = 3;
    ratingDescription = 'excellent';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// console.log('before:', process.argv);
// // const target : number = Number(process.argv[2])
// // const trainingHours : Array<number> = process.argv.slice(3).map(a => Number(a))
// // console.log(calculateExercises(trainingHours, target))

// try {
//   // const target : number = Number(process.argv[2])
//   // const trainingHours : Array<number> = process.argv.slice(3).map(a => Number(a))
//   const { trainingHours, target } = parseArguments(process.argv);
//   console.log(calculateExercises(trainingHours, target));
// } catch (e: unknown) {
//   let errorMessage = 'Error, something bad happened, message: ';
//   if (e instanceof Error) {
//     errorMessage += e.message;
//   }
//   console.log(errorMessage);
// }
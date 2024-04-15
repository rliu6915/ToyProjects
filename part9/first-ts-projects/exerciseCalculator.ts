interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (trainingHours : Array<number>, target : number) : Result => {
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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
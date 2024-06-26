export const calculateBmi = (hegiht : number, weight : number) : string => {
  const bmi = weight / ((hegiht / 100) ** 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

// console.log(calculateBmi(185, 84))
console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

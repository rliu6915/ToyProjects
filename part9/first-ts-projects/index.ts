import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello full stack');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  if (!req.query.height || !req.query.weight 
    || isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const { height, weight } = req.query;
  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // validate the data
  if (!daily_exercises || !target 
    || isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return res.status(400).json({
      error: 'parameters missing or malformatted'
    });
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  console.log(result);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
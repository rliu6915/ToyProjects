import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
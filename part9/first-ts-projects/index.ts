import express from 'express'
const app = express()
import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('hello full stack')
})

app.get('/bmi', (req, res) => {
  const { h, w } = req.query
  const bmi = calculateBmi(h, w)
  res.json({
    height: h,
    weight: w,
    bmi: bmi
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
// const express = require('express');
import express from "express";
import { calculateBmi } from './bmiCalculator'; 
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    // console.log("we are here.")
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || ! weight || isNaN(Number(weight)) || isNaN(Number(height))) {
        res.status(400).json({
            error: "malformatted parameters"
        });
        return;
    }

    const bmi = calculateBmi(Number(height), Number(weight));

    res.json({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    console.log('req body: ', req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    
    if (!daily_exercises || !target) {
        res.status(400).json({
            error: "parameters missing"
        });
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const exerciseObject = calculateExercises(daily_exercises, target);

    res.json(exerciseObject);
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// const express = require('express');
import express from "express";
import { calculateBmi } from './bmiCalculator' 

const app = express();

app.get('/hello', (_req, res) => {
    // console.log("we are here.")
    res.send("Hello Full Stack!")
})

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query

    if (!height || ! weight || isNaN(Number(weight)) || isNaN(Number(height))) {
        res.status(400).json({
            error: "malformatted parameters"
        })
    }

    const bmi = calculateBmi(Number(height), Number(weight))

    res.json({
        weight,
        height,
        bmi
    })
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
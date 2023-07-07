/* eslint-disable consistent-return */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const Person = require('./models/person')

// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
// middleware for logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
// print data in http post request
morgan.token('content', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/api/persons', (req,res) => {
//     res.json(persons);
// })
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

// app.get('/api/persons/:id', (req,res) => {
//     // const id = Number(req.params.id);
//     const person = persons.find(person => person.id === id);
//     // console.log(person);
//     if(person){
//         res.json(person);
//     } else {
//         res.status(404).end();
//     }
// })
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
  // .catch(error => {
  //     // console.log(error)
  //     res.status(400).send({ error: 'malformatted id' })
  // })
    .catch((error) => next(error))
})

// const generateId = (persons) => {
//     const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
//     return maxId + 1;
// }

// app.post('/api/persons', (req,res) => {
//     if (!req.body.name || !req.body.number) {
//         return res.status(400).json({
//             eorror: 'name or number missing'
//         })
//     }

//     if (persons.find(person => person.name === req.body.name)) {
//         return res.status(400).json({
//             error: 'name must be unique'
//         })
//     }

//     const person = {
//         id: generateId(),
//         name: req.body.name,
//         number: req.body.number
//     }

//     // console.log(person);
//     res.json(person);
// })
app.post('/api/persons', (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  person.save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
  // .catch(error => {
  //     console.log(error.name);
  //     res.status(400).json({
  //         error: error.message
  //     })
  // })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  }

  Person
    .findByIdAndUpdate(
      req.params.id,
      person,
      { new: true, runValidators: true, context: 'query' },
    )
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

// app.delete('/api/persons/:id', (req,res) => {
//     const id = Number(req.params.id);
//     persons = persons.filter(person => person.id !== id);
//     res.status(204).end();
// })
app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  const date = new Date()
  Person.find({}).then((persons) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
  })
})

// unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknown endpoint',
  })
}
app.use(unknownEndpoint)

// error handler middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id',
    })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message,
    })
  }

  next(error)
}
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

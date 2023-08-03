import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const createNew = async (newObject) => {
  const response = await axios.post('http://localhost:3001/anecdotes', newObject)
  return response.data
}

const update = async (updateObject) => {
  const response = await axios.put(`http://localhost:3001/anecdotes/${updateObject.id}`, updateObject)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, update }
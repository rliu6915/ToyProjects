import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(`${baseUrl}/${newObject.blog}/comments`, newObject)
  return response.data
}

export default { getAll, create }
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, { headers: { Authorization: token } })
  return response.data
}

const like = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, { headers: { Authorization: token } })
  return response.data
}

const remove = async (id) => {
  const resposne = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
  return resposne.data
}

export default { getAll, setToken, create, like, remove }
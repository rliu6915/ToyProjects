import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const create = async () => {

}

export default { getAll, create }
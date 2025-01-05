const KEY = 'loggedBlogappUser'

const saveUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user))
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(KEY)
  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }
  return null
  // return JSON.parse(window.localStorage.getItem(KEY))
}

const removeUser = () => {
  window.localStorage.removeItem(KEY)
}

export default { saveUser, getUser, removeUser }
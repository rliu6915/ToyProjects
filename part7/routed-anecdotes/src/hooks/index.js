import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    // console.log(event.target.value)
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [
    {
      name,
      value,
      onChange
    },
    reset
  ]
}


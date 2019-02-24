import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = baseUrl => {
  const [resource, setResources] = useState([])
  let token = null

  const setToken = newToken => {
    token = `bearer ${token}`
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
    return response.data
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    const receivedObject = response.data

    if (receivedObject) {
      setResources(resource.concat(receivedObject))
    }

    return receivedObject
  }

  const update = async (id, newObject) => {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
  }

  const service = {
    create,
    getAll,
    update,
    setToken
  }

  return [ resource, service ]
}

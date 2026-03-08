import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get all tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/tasks`)
      setTasks(response.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  // Create task
  const createTask = useCallback(async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/tasks`, data)
      setTasks(prev => [response.data, ...prev])
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar task')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete task
  const deleteTask = useCallback(async (id) => {
    setLoading(true)
    try {
      await axios.delete(`${API_URL}/tasks/${id}`)
      setTasks(prev => prev.filter(task => task.id !== id))
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao deletar task')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    deleteTask
  }
}

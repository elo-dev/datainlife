import axios from 'axios'

const API_URL = 'https://datainlife.ru/junior_task/'

export const instance = axios.create({
  baseURL: API_URL,
})

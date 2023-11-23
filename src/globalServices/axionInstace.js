import axios from 'axios'

export const axionInstace = axios.create({
    baseURL: 'https://makemymemories.vercel.app/api/'
})
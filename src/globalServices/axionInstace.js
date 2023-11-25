import axios from 'axios'
import { parse, stringify } from 'qs'

export const axionInstace = axios
.create({
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
      },
    baseURL: 'https://makemymemories.vercel.app/api/'
})
import { axionInstace } from "./axionInstace"
import axios from 'axios'
export const getPhotoGrapherDetails = (query='A')=>{
   return axios.get(`${process.env.BASE_URL}/v1/search?query=${query}`)
    .then((result) => {
       return result.data
     
    }).catch((e) => {
      return e
    })
}

export const getSinglePhotoGrapher = (key)=>{
    return axios.get(`${process.env.BASE_URL}/v1/photographer`,{
        params:key
    })
    .then((result) => {
       return result.data
     
    }).catch((e) => {
      return e
    })
}
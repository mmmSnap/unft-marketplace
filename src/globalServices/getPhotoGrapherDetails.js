import { axionInstace } from "./axionInstace"

export const getPhotoGrapherDetails = (query='A')=>{
   return axionInstace.get(`/v1/search?query=${query}`)
    .then((result) => {
       return result.data
     
    }).catch((e) => {
      return e
    })
}
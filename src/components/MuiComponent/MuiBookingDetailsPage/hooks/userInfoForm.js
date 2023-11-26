
import React from 'react'
import { useForm } from "react-hook-form";

const UserInfoForm = (userAddress)=>{

    const form = useForm({
        mode: "onBlur",
        defaultValues:{
          ...userAddress
        }
    });
   return form
}

export default UserInfoForm
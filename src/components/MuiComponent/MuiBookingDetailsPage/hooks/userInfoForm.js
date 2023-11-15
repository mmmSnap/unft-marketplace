
import React from 'react'
import { useForm } from "react-hook-form";

const userInfoForm = ()=>{

    const form = useForm({
        mode: "onBlur",
    });
   return form
}

export default userInfoForm
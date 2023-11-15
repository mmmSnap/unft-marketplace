
import React from 'react'
import { useForm } from "react-hook-form";

const UserInfoForm = ()=>{

    const form = useForm({
        mode: "onBlur",
    });
   return form
}

export default UserInfoForm
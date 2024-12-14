/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import RenderComponent from "../UtilComponents/RenderComponent";
import { FormDataProps } from "../Types/types";
// import { useAppDispatch } from "../store/hooks";
// import { useState } from "react";
// import axios from "axios";
// import { APIVersion, hostName } from "../Host";
// import { setAuth } from "../store/Slices/UserSlice";
import { loginInstance } from "../Utils/axios";
import useAPI from "../CustomHooks/useAPI";
import useSetDispatch from "../CustomHooks/useSetDispatch";
// import { setUser } from "../store/Slices/UserSlice";


export interface LogInFormValues {
  email: string,
  password: string
}


const LogInForm:FormDataProps[] = [
  {
    label: "Email",
    id: "email",
    uid: "2",
    type: "text",
    name: "email",
    validations:{
      required: true,
    },
    errorMessages: {
      required: 'Email is Required'
    }
  },
  {
    label: "Password",
    id: "password",
    uid: "3",
    type: "password",
    name: "password",
    validations:{
      required: true,
    },
    errorMessages: {
      required: 'Password is Required'
    }
  }
]

const Login = () => {

 const {error, setError, navigate} = useAPI()
 const {showLoader, hideLoader} = useSetDispatch()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LogInFormValues>();

  const onSubmit:SubmitHandler<LogInFormValues> = async(data) =>{
    try{
      showLoader()
      const res = await loginInstance.post(`/users/login`,data);
      console.log("ayy check onsubmit", res)
      if(res.data.status === 'success'){
        const { token } = res.data;
        document.cookie = `token=${token}; path=/`;
        console.log("ayy check login response")
        // await dispatch(setAuth('Y'))
        sessionStorage.setItem("auth", 'Y')
        navigate('/')
      } 
    }
    catch(error: any){
        // const innerErr =error?.response?.data?.error
        // if(innerErr?.code === 11000){
        //   const errorMsg = Object.keys(innerErr.keyPattern).join(' and ')
        //   setError(errorMsg+' Already Exists')
        // }
      setError(error.response.data.message)
      console.log("Error in onSubmit login", error)
      // setError('Error in Signup' + error)
    }
    finally{
      hideLoader()
    }
  };
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="grid md:gap-3 gap-2 mb-2"
          id="Login">
          <RenderComponent<UseFormRegister<LogInFormValues>, FieldErrors<LogInFormValues>> components={LogInForm} register={register} errors={errors}></RenderComponent>
        </div>
        {
        error &&  <p role="alert"  className=" text-red-500 company font-medium mt-1">{error}</p>
        }
        <div className="flex flex-row justify-center mt-5">
          <button
            type="submit"
            className="downloadbtn px-3 py-2 text-white rounded-md w-full">
            Login
          </button>
        </div>
    </form>
      <h5 className='py-2 font-bold company text-center text-lg'>New User? <Link to="/signup" className="text-primary">Sign Up</Link> </h5>
    </>
  );
};

export default Login
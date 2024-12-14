/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import RenderComponent from "../UtilComponents/RenderComponent";
import { FormDataProps } from "../Types/types";
import axios from "axios";
import { APIVersion, hostName } from "../Host";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setLoading } from "../store/Slices/AppSlice";



interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}


const SignUpFormData:FormDataProps[] = [
    {
      label:"User Name",
      id:"name",
      type:"text",
      uid: "1",
      name: "name",
      validations: {
        required: true,
        maxLength: 20,
      },
      errorMessages: {
        required: "User Name is Required",
        maxLength: "Name should be less than 20 characters",
      }
    },
    {
      label: "Email",
      id: "email",
      uid: "2",
      type: "text",
      name: "email",
    },
    {
      label: "Password",
      id: "password",
      uid: "3",
      type: "password",
      name: "password",
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      uid: "4",
      type: "password",
      name: "confirmPassword",
    }
  ];

const SignUp = () => {

  const [error, setError] = useState("")
  const dispatch = useAppDispatch()
 const navigate = useNavigate()
  // const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormValues>();



  const onSubmit:SubmitHandler<SignUpFormValues> = async(data) =>{
    try{
      dispatch(setLoading(true))
      const res = await axios.post(`${hostName+APIVersion}/users/signup`,data,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("ayy check onsubmit", res)
      if(res.data?.data?.user){
        navigate('/login')
      } 
    }
    catch(error: any){
        const innerErr =error?.response?.data?.error
        if(innerErr?.code === 11000){
          const errorMsg = Object.keys(innerErr.keyPattern).join(' and ')
          setError(errorMsg+' Already Exists')
        }
      console.log("Error in onSubmit Signup", error)
      // setError('Error in Signup' + error)
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="grid md:gap-3 gap-2 mb-2"
          id="SignUp">
          <RenderComponent<UseFormRegister<SignUpFormValues>, FieldErrors<SignUpFormValues>> components={SignUpFormData} register={register} errors={errors}></RenderComponent>
        </div>
        {
        error &&  <p role="alert"  className=" text-red-500 company font-medium mt-1">{error}</p>
        }
        <div className="flex flex-row justify-center mt-5">
          <button
            type="submit"
            className="downloadbtn px-3 py-2 text-white rounded-md w-full"
            disabled={false}
            >
            Sign Up
          </button>
        </div>
    </form>
      <h5 className='py-2 font-bold company text-center text-lg'>Already have an account? <Link to="/login" className="text-primary">Log In</Link> </h5>
    </>
  );
};

export default SignUp
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
// import Input from "../../Components/Input";
// import TextArea from "../../Components/TextArea";
import RenderComponent from "../../UtilComponents/RenderComponent";
import { FormDataProps } from "../../Types/types";
import { axiosInstance } from "../../Utils/axios";
import { setDocument } from "../../store/Slices/DataSlice";
import useAPI from "../../CustomHooks/useAPI";
import useSetDispatch from "../../CustomHooks/useSetDispatch";
import { useLocation } from "react-router-dom";


export interface CreateNewForm{
  templatename: string;
  name: string;
}



const CreateNewForm: FormDataProps[]= [
  {
    label: "Template Name",
    id: "templatename",
    uid: "0",
    type: "text",
    name: "templatename",
    validations: {
      required: true,
      maxLength: 50,
    },
    errorMessages: {
      required: "Template Name is Required",
      maxLength: "Name should be less than 50 characters long",
    }
  },
    {
      label: "Name",
      id: "name",
      uid: "1",
      type: "text",
      name: "name",
      validations: {
        required: true,
        maxLength: 20,
      },
      errorMessages: {
        required: "Name is Required",
        maxLength: "Name should be less than 20 characters",
      }
    }
  ];

const CreateNew = () => {
  const {error, setError, navigate} = useAPI()
  const {showLoader, hideLoader, dispatch} = useSetDispatch()
  const location = useLocation()
 
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewForm>();
  
  const onSubmit:SubmitHandler<CreateNewForm> = async(data) =>{
    try{
      showLoader()
      
      const res = await axiosInstance.post(`/personalInfo`,data);
      
      console.log("ayy check onsubmit", location)
      if(res.data.status === 'success' && res.data.document?._id){
       dispatch(setDocument(res.data.document))
       navigate(`/details/${res.data.document._id}/PersonalInfo`)
      } 
    }
    catch(error: any){
        // const innerErr =error?.response?.data?.error
        // if(innerErr?.code === 11000){
        //   const errorMsg = Object.keys(innerErr.keyPattern).join(' and ')
        //   setError(errorMsg+' Already Exists')
        // }
      setError(error.message+' Already Exists')
      console.log("Error in saving PersonalDetails", error)
      // setError('Error in Signup' + error)
    }
    finally{
      hideLoader()
    }
  };
  console.log("ayy check error", errors);
  return (
    <>
      <h5 className="text-inherit md:font-bold font-semibold text-black text-center md:text-2xl text-lg lg:mb-5 mb-3">
        Enter Your Personal Details
      </h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="grid md:grid-cols-3 sm:grid-cols-2 md:gap-3 gap-2 mb-2"
          id="PersonalDetails">
          <RenderComponent components={CreateNewForm} register={register} errors={errors}></RenderComponent>
        </div>
        {
        error &&  <p role="alert"  className=" text-red-500 company font-medium mt-1">{error}</p>
        }
        <div className="flex flex-row justify-center">
          <button
            type="submit"
            className="downloadbtn px-3 py-2 text-white rounded-md">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNew;

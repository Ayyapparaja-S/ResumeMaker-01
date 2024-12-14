/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
// import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import RenderComponent from "../../UtilComponents/RenderComponent";
import { FormDataProps, PersonalInfoInputs } from "../../Types/types";
import { axiosInstance } from "../../Utils/axios";
import { setDocument } from "../../store/Slices/DataSlice";
import useAPI from "../../CustomHooks/useAPI";
import useSetDispatch from "../../CustomHooks/useSetDispatch";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { CallAPI } from "../../Utils/CommonUtils";





const PersonalInfoForm: FormDataProps[]= [
  {
    label: "Name",
    id: "name",
    uid: "1",
    type: "text",
    name: "name",
  },
    {
      label: "Role",
      id: "role",
      uid: "2",
      type: "text",
      name: "role",
    },
    {
      label: "Mobile Number",
      id: "mobile",
      uid: "3",
      type: "number",
      name: "mobile",
    },
    {
      label: "Email",
      id: "email",
      uid: "4",
      type: "email",
      name: "email",
    },
    {
      label: "LinkedIn Label",
      id: "linkedinlabel",
      uid: "5",
      type: "text",
      name: "linkedinlabel",
    },
    {
      label: "LinkedIn Link",
      id: "linkedinlink",
      uid: "6",
      type: "text",
      name: "linkedinlink",
    },
    {
      label: "Portfolio Link",
      id: "portfoliolink",
      uid: "7",
      type: "text",
      name: "portfoliolink",
    },
    {
      label: "Address",
      id: "address",
      uid: "8",
      type: "text",
      name: "address",
    },
  ];

const PersonalDetails = () => {
  const {error, setError, navigate} = useAPI()
  const {showLoader, hideLoader, dispatch} = useSetDispatch()
  const params = useParams()
 
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PersonalInfoInputs>();

  
  const success = (res: any) => {

    if(!res.data?.data?.document) return;

    const obj:{[key: string]: any} ={}

    PersonalInfoForm.map((formdata)=> {
      obj[formdata.name] = res.data.data.document[formdata.name] || ''
    })

    obj["summary"] = res.data.data.document["summary"]

    reset(obj)
   
  }

  useEffect(()=> {
    CallAPI({method: 'get', url: `personalInfo/${params.id}`,success})
  },[])


  if(!params.id) navigate('/')

  const onSubmit:SubmitHandler<PersonalInfoInputs> = async(data) =>{
    try{
      showLoader()
      
      const res = await axiosInstance.patch(`/personalInfo/${params.id}`,data);
      
      console.log("ayy check onsubmit", res)
      if(res.data.status === 'success'){
       dispatch(setDocument(res.data.document))
        navigate(`../Experience`)
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
          <RenderComponent components={PersonalInfoForm} register={register} errors={errors}></RenderComponent>
          <TextArea
            label="Summary"
            id="summary"
            rows={5}
            cols={50}
            className="md:col-span-3"
            {...register("summary")}></TextArea>
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

export default PersonalDetails;

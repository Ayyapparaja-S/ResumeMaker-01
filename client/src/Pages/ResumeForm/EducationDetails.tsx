/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
// import Input from "../../Components/Input";
import RenderComponent from "../../UtilComponents/RenderComponent";
import { AnyObject, EducationDetailsInputs, EducationProps, FormDataProps } from "../../Types/types";
import useAPI from "../../CustomHooks/useAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { generateId, getFormDataResponse} from "../../Utils/CommonUtils";
import Btn from "../../Components/Btn";
import DeleteIcon from '@mui/icons-material/Delete';
import useSetDispatch from "../../CustomHooks/useSetDispatch";
import { axiosInstance } from "../../Utils/axios";


const EducationDetailsForm:FormDataProps[]= (()=>([
    {
      label: "Course",
      id: "course",
      uid: generateId(),
      type: "text",
      name: "course",
    },
    {
      label: "Specialization",
      id: "specialization",
      uid: generateId(),
      type: "text",
      name: "specialization",
    },
    {
      label: "College/University",
      id: "college",
      uid: generateId(),
      type: "text",
      name: "college",
    },
    {
      label: "Start Date",
      id: "startDate",
      uid: generateId(),
      type: "text",
      name: "startDate",
    },
    {
      label: "End Date",
      id: "endDate",
      uid: generateId(),
      type: "text",
      name: "endDate",
    },
    {
      label: "Grade",
      id: "grade",
      uid: generateId(),
      type: "text",
      name: "grade",
    }
  ]))();


interface EducationWrapperProps  {
  educationData : EducationProps,
  deleteRow: (id: string)=> void
}


const EducationDetails = ({educationData, deleteRow}: EducationWrapperProps) => {
  const {error,setError, navigate} = useAPI()
  const params = useParams()
  const {showLoader, hideLoader} = useSetDispatch()
  const [education, setEducation] = useState<EducationProps | AnyObject>({})

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<EducationDetailsInputs>();

  useEffect(()=> {
    if(educationData._id){
      setEducation(educationData)
      reset(educationData)
    }
  }, [educationData._id])
 
  
  
    if(!params.id) navigate('/')
  
      
  const onSubmit:SubmitHandler<EducationDetailsInputs> = async(data) =>{
    try{
      showLoader()
      const obj= {}
      if(education?._id){
        const newdata = {...data,personalInfo_id: params.id}
        const res = await axiosInstance.patch(`/education/${education._id}`,newdata);
        getFormDataResponse(EducationDetailsForm, res.data.document, obj)
        reset(obj)
        setEducation(res.data.document)
        return;
      }
      const newdata = {...data, personalInfo_id: params.id}
      const res = await axiosInstance.post(`/education`,newdata);
      getFormDataResponse(EducationDetailsForm, res.data.document, obj)
      reset(obj)
      setEducation(res.data.document)
      console.log("ayy check onsubmit", res)
      // if(res.data.status === 'success'){
      // } 
    }
    catch(error: any){
      setError(error.message+' Already Exists')
      console.log("Error in saving Experience", error)
    }
    finally{
      hideLoader()
    }
  };
      
  return (
    <>
      <form  onSubmit={handleSubmit(onSubmit)} className="IteratorIndex mb-3 relative">
        <div
          className="grid md:grid-cols-3 sm:grid-cols-2 md:gap-3 gap-2 mb-2">
            <Btn type='button' className="place-self-end justify-self-end self-end cornerBtn" btnClassName="roundedBtn bg-yellow-500" onClick={()=> deleteRow(educationData._id as string)}><DeleteIcon sx={{ fontSize: 15 }}></DeleteIcon></Btn>
          <RenderComponent components={EducationDetailsForm} register={register} errors={errors}></RenderComponent>
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


export default EducationDetails
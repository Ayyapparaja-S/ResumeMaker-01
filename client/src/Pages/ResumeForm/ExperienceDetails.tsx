/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
// import Input from "../../Components/Input";
import RenderComponent from "../../UtilComponents/RenderComponent";
import { AnyObject, ExperienceInputs, ExperienceProps, FormDataProps, PointsProps } from "../../Types/types";
import { axiosInstance } from "../../Utils/axios";
import useAPI from "../../CustomHooks/useAPI";
import useSetDispatch from "../../CustomHooks/useSetDispatch";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import IteratorInputs from "./IteratorInputs";
import { generateId, generateIdData, getFormDataResponse } from "../../Utils/CommonUtils";
import { useState } from "react";
import Btn from "../../Components/Btn";
import DeleteIcon from '@mui/icons-material/Delete';




const ExperienceSubContentProps: FormDataProps[] = [
  {
    label: "Sub Heading",
    id: "subhead",
    uid: "1",
    type: "text",
    name: "subhead",
  },
  {
    label: "Sub Content",
    id: "subcontent",
    uid: "2",
    type: "text",
    name: "subcontent",
  },
]


const ExperienceDetailsForm:FormDataProps[]= (()=>([
    {
      label: "Role",
      id: "role",
      uid: generateId(),
      type: "text",
      name: "role",
    },
    {
      label: "Company",
      id: "company",
      uid: generateId(),
      type: "text",
      name: "company",
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
      label: "Content",
      id: "content",
      uid: generateId(),
      type: "text",
      name: "content",
    }
  ]))();


  const experienceModel = {
    subhead: '',
    subcontent: ''
  }

interface ExperienceWrapperProps  {
  experienceData : ExperienceProps,
  deleteRow: (id: string)=> void
}


const ExperienceDetails = ({experienceData, deleteRow}: ExperienceWrapperProps) => {
  const {error, setError, navigate} = useAPI()
  const {showLoader, hideLoader} = useSetDispatch()
  const params = useParams()
  const [Points, setPoints] = useState<PointsProps[] | []>([{subhead: '', subcontent:'',id: generateId()}])
  const [experience, setExperience] = useState<ExperienceProps | AnyObject>({})

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ExperienceInputs>();

  useEffect(()=> {
    if(experienceData._id){
      setExperience(experienceData)
      reset(experienceData)
      const Points = generateIdData(experienceData.points)
      setPoints(Points)
    }
  }, [experienceData._id])
 

  if(!params.id) navigate('/')

  const onSubmit:SubmitHandler<ExperienceInputs> = async(data) =>{
    try{
      showLoader()
      const obj= {}
      if(experience?._id){
        const newdata = {...data, points: Points, personalInfo_id: params.id}
        const res = await axiosInstance.patch(`/experience/${experience._id}`,newdata);
        getFormDataResponse(ExperienceDetailsForm, res.data.document, obj)
        reset(obj)
        setExperience(res.data.document)
        setPoints(res.data.document.points)
        return;
      }
      const newdata = {...data, points: Points, personalInfo_id: params.id}
      const res = await axiosInstance.post(`/experience`,newdata);
      getFormDataResponse(ExperienceDetailsForm, res.data.document, obj)
      reset(obj)
      setExperience(res.data.document)
      setPoints(res.data.document.points)
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
  console.log("ayy check error", errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="IteratorIndex mb-3 relative">
        <div
          className="grid md:grid-cols-3 sm:grid-cols-2 md:gap-3 gap-2 mb-2">
            <Btn type='button' className="place-self-end justify-self-end self-end cornerBtn" btnClassName="roundedBtn bg-yellow-500" onClick={()=> deleteRow(experienceData._id as string)}><DeleteIcon sx={{ fontSize: 15 }}></DeleteIcon></Btn>
          <RenderComponent components={ExperienceDetailsForm} register={register} errors={errors}></RenderComponent>
          <IteratorInputs IteratorClassName="md:grid-cols-2" dataModel={experienceModel} dataList={Points} setter={setPoints} components={ExperienceSubContentProps}></IteratorInputs>
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


export default ExperienceDetails
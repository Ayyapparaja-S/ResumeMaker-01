/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import ExperienceDetails from "./ExperienceDetails"
import { CallAPI, generateId, generateIdData } from "../../Utils/CommonUtils"
import { useParams } from "react-router-dom"
import { ExperienceProps } from "../../Types/types"
import Btn from "../../Components/Btn"
import AddIcon from '@mui/icons-material/Add';
import { axiosInstance } from "../../Utils/axios"


const WrapperInitialData:ExperienceProps = (()=>({
  role: '',
  company: '',
  startDate: '',
  endDate: '',
  content: '',
  points:[]
}))()

const ExperienceWrapper = () => {
  const [experience, setExperience] = useState<ExperienceProps[] | []>([])
  // const {dispatch, globalState} = useSetDispatch()
  const params = useParams()

  const success = (res: any) => {
    if(res.data?.data?.document?.experience){
      const experienceRes = res.data.data.document.experience as ExperienceProps[]
      const datawithID = generateIdData(experienceRes)
      setExperience(datawithID)
    }
  }

  useEffect(()=> {
    CallAPI({method: 'get', url: `personalInfo/${params.id}`,success})
  },[])

  const handleOnClick = ()=>{
    if(experience.length<5) 
    setExperience((prev)=> [...prev, {...WrapperInitialData, id: generateId()}])
  }

  const deleteRow = async(_id: string)=>{
    const res = await axiosInstance.delete(`/experience/${_id}`);
    if(res.data.status==='success'){
      CallAPI({method: 'get', url: `personalInfo/${params.id}`,success})
    }
  }

  return (
    <>
    <h5 className="text-inherit md:font-bold font-semibold text-black text-center md:text-2xl text-lg lg:mb-5 mb-3">
        Experience
     </h5>
    {
        experience?.map((data)=> {
           return (<ExperienceDetails key={data.id} experienceData={data} deleteRow={deleteRow}></ExperienceDetails>)
        })
    }
    <h5 className="text-inherit md:font-bold font-semibold text-black text-center md:text-lg text-lg mb-2">
      Add  Experience
     </h5>
    <Btn type='button' onClick={handleOnClick} className="mb-2" btnClassName="rounded-[25px] roundedBtn"><AddIcon sx={{ fontSize: 15 }}></AddIcon></Btn>
    </>
  )
}

export default ExperienceWrapper
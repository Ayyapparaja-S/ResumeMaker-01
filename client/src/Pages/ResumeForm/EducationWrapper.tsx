/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { CallAPI, generateId, generateIdData } from "../../Utils/CommonUtils"
import { useParams } from "react-router-dom"
import { EducationProps } from "../../Types/types"
import Btn from "../../Components/Btn"
import AddIcon from '@mui/icons-material/Add';
import { axiosInstance } from "../../Utils/axios"
import EducationDetails from "./EducationDetails"



const WrapperInitialData:EducationProps = (()=>({
    course: '',
    specialization: '',
    college: '',
    startDate: '',
    endDate: '',
    grade: '',
}))()

 

const EducationWrapper = () => {
  const [education, setEducation] = useState<EducationProps[] | []>([])
  const params = useParams()
  // const {dispatch, globalState} = useSetDispatch()

  const success = (res: any) => {
    if(res.data?.data?.document?.education){
      const educationRes = res.data.data.document.education as EducationProps[]
      const datawithID = generateIdData(educationRes)
      setEducation(datawithID)
    }
  }

  useEffect(()=> {
    CallAPI({method: 'get', url: `personalInfo/${params.id}`,success})
  },[])

  const handleOnClick = ()=>{
    if(education.length<5) 
    setEducation((prev)=> [...prev, {...WrapperInitialData, id: generateId()}])
  }

  const deleteRow = async(_id: string)=>{
    const res = await axiosInstance.delete(`/education/${_id}`);
    if(res.data.status==='success'){
      CallAPI({method: 'get', url: `personalInfo/${params.id}`,success})
    }
  }


  return (
    <>
    <h5 className="text-inherit md:font-bold font-semibold text-black text-center md:text-2xl text-lg lg:mb-5 mb-3">
        Education
     </h5>
    {
        education?.map((data)=> {
           return (<EducationDetails key={data.id} educationData={data} deleteRow={deleteRow}></EducationDetails>)
        })
    }
    <h5 className="text-inherit md:font-bold font-semibold text-black text-center md:text-lg text-lg mb-2">
      Add  Education
     </h5>
    
    <Btn type='button' onClick={handleOnClick} className="mb-2" btnClassName="rounded-[25px] roundedBtn"><AddIcon sx={{ fontSize: 15 }}></AddIcon></Btn>
    </>
  )
}

export default EducationWrapper
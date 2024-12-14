/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react'
import ListInput from '../../Components/ListInput'
import useAPI from '../../CustomHooks/useAPI'
import useSetDispatch from '../../CustomHooks/useSetDispatch'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../Utils/axios'
import { setDocument } from '../../store/Slices/DataSlice'
import { CallAPI } from '../../Utils/CommonUtils'

const SkillDetails = () => {

  const [skills, setSkills] = useState<string[]>([])
  const [tools, setTools] = useState<string[]>([])
  const { setError, navigate} = useAPI()
  const {showLoader, hideLoader, dispatch} = useSetDispatch()
  const params = useParams()

   
  const success = (res: any) => {

    if(!res.data?.data?.document) return;

    setSkills(res.data.data.document.skills)
    setTools(res.data.data.document.tools)

  }
  
  useEffect(()=> {
    CallAPI({method: 'get', url: `personalInfo/${params.id}`,success})
  },[])

  const onSubmit= async(e: FormEvent<HTMLFormElement>) =>{
    try{
      e.preventDefault();
      showLoader()
      const res = await axiosInstance.patch(`/personalInfo/${params.id}`,{skills, tools});
      if(res.data.status === 'success'){
       dispatch(setDocument(res.data.document))
        navigate(`../Education`)
      } 
    }
    catch(error: any){
      setError(error.message+' Already Exists')
      console.log("Error in saving Skill Details", error)
    }
    finally{
      hideLoader()
    }
  };

  return (
    <>
      <h5 className="text-inherit md:font-bold font-semibold text-black text-center md:text-2xl text-lg lg:mb-5 mb-3">
        Skills and Tools
      </h5>
      <form onSubmit={onSubmit}>
      <ListInput label='Skills' name='skills' id='skills' list={skills} setList={setSkills}></ListInput>
      <ListInput label='Tools' name='tools' id='tools' list={tools} setList={setTools}></ListInput>
      <div className="flex flex-row justify-center">
          <button
            type="submit"
            className="downloadbtn px-3 py-2 text-white rounded-md">
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default SkillDetails
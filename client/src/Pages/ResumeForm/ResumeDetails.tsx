import {Link, Outlet, useLocation, useParams } from 'react-router-dom'
import LinkTo from '../../Components/NavLink'
import { CommonProps } from '../../Types/types'
import { useEffect } from 'react'
import useAPI from '../../CustomHooks/useAPI'
import useSetDispatch from '../../CustomHooks/useSetDispatch'
import { axiosInstance } from '../../Utils/axios'
import { setDocument } from '../../store/Slices/DataSlice'


const ResumeDetails = ({className, id}: CommonProps) => {
  const { navigate} = useAPI()
  const {showLoader, hideLoader, dispatch} = useSetDispatch()
   const params = useParams()
  const location = useLocation()
  

  useEffect(()=> {
    const getAPI = async() =>{
      try{
        showLoader()
        if(params.id){
          const res = await axiosInstance.get(`personalInfo/${params.id}`);
          console.log("ayy check getresume", location)
          if(res.data.status === 'success'){
            dispatch(setDocument(res.data.document))
          } 
        }
      }
      catch(e){
        console.log("Error in Download Resume", e)
        navigate('/')
      }
      finally{
        hideLoader()
      }
    }
    getAPI()
  }, [])

  return (
    <>
    <div className={`flex md:flex-row flex-col gap-5 md:mx-5 ${className}`} id={id}>
    <section id='detailSections' className='md:w-1/6 w-full shadow-xl'>
      <div className='flex md:flex-col flex-row md:gap-2 gap-1 text-center'>
          <LinkTo to={`PersonalInfo`} className='bg-primary md:py-2 md:px-0 md:bg-none p-2 mx-2 rounded-lg'>Personal</LinkTo>
          <LinkTo to={`Experience`} className='bg-primary py-2 mx-2 rounded-lg'>Experience</LinkTo>
          <LinkTo to={`Skills`} className='bg-primary py-2 mx-2 rounded-lg'>Skills</LinkTo>
          <LinkTo to={`Education`} className='bg-primary py-2 mx-2 rounded-lg'>Education</LinkTo>
      </div>
    </section>
    <section id='formSection' className='md:w-5/6 w-full md:p-3 p-2 shadow-xl'>
        <Outlet></Outlet>
    </section>
    </div>
    <div className='text-center pt-3'>
    <Link to={`/Preview/${params.id}`} className='bg-primaryDark rounded-md px-3 py-2 text-white text-center'>Preview Resume</Link>
    </div>
    </>
  )
}

export default ResumeDetails
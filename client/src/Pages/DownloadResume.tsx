// DownloadResume.js
// import ResumeTemplate from './ResumeTemplate';
import { useEffect } from 'react';
// import Main from './Main';
import ResumeDetails from './ResumeForm/ResumeDetails';
import { Link, useParams } from 'react-router-dom';

import useSetDispatch from '../CustomHooks/useSetDispatch';
import { axiosInstance } from '../Utils/axios';
import { setDocument } from '../store/Slices/DataSlice';
import useAPI from '../CustomHooks/useAPI';

const DownloadResume = () => {
  
 const { navigate} = useAPI()
 const {showLoader, hideLoader, dispatch} = useSetDispatch()
  const params = useParams()


  useEffect(()=> {
    const getAPI = async() =>{
      try{
        showLoader()
        if(params.id){
          const res = await axiosInstance.get(`/personalInfo`);
          console.log("ayy check downloadresume", res)
          if(res.data.status === 'success'){
            dispatch(setDocument(res.data.document))
            navigate('/home/../Experience')
          } 
        }
      }
      catch(e){
        console.log("Error in Download Resume", e)
      }
      finally{
        hideLoader()
      }
    }
    getAPI()
  }, [])

  return (
    <div>
      {/* <Panner></Panner> */}
      <ResumeDetails className='md:py-5' id='no-print'></ResumeDetails>
      <div className='py-5' id='no-print'>
      <Link to='/Preview' className='downloadbtn px-3 py-2 text-white rounded-md '>Preview Resume</Link>
      </div>
      {/* <Main></Main> */}
    </div>
  );
};

export default DownloadResume;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Main from "./Main";
import { Link, useParams } from "react-router-dom";
import { CallAPI } from "../Utils/CommonUtils";
import { documentProps } from "../Types/types";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PreviewResume = () => {
  const [document, setDocument] = useState<documentProps | null>(null)
  // const {dispatch, globalState} = useSetDispatch()
  const params = useParams()
  

  
  const success = (res: any) => {
    if(res.data?.data?.document){
      setDocument(res.data.data.document as documentProps)
    }
  }

  useEffect(()=> {
    CallAPI({method: 'get', url: `personalInfo/${params.id}`,success})
  },[])

    const handleDownload = async () => {
        window.print()
      };

  if(document === null) return null;
    
  return (
    <>
    <Link to={`/details/${params.id}/PersonalInfo`} id="no-print" className='px-3 py-2 rounded-md text-blue-500'><ArrowBackIosIcon className="text-blue-500" sx={{ fontSize: 13 }}></ArrowBackIosIcon>Back to Edit Resume</Link>
    <div className='text-center pt-3' id="no-print">
    <button onClick={handleDownload} className='downloadbtn px-3 py-2 text-white rounded-md '>Download as PDF</button>
    </div>
    <Main data={document}></Main>
    </>
  )
}

export default PreviewResume
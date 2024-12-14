/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { CallAPI } from '../../Utils/CommonUtils';
import HistoryDetails from './HistoryDetails';
import { documentProps } from '../../Types/types';
import { axiosInstance } from '../../Utils/axios';

const History = () => {

  const [history, setHistory] = useState<documentProps[] | []>([])
  
  const success = (res: any) => {
    console.log("csdaf", res.data)
    if(!res.data?.document) return;
    setHistory(res.data.document)
  }

  useEffect(()=> {
    CallAPI({method: 'get', url: `personalInfo`,success})
  },[])

  const deleteRow = async(_id: string)=>{
    const res = await axiosInstance.delete(`/personalInfo/${_id}`);
    if(res.data.status==='success'){
      CallAPI({method: 'get', url: `personalInfo`,success})
    }
  }

  return (
    <>
    {
      history.length > 0 ? 
      history.map((personalInfoData)=> <HistoryDetails key={personalInfoData._id} data={personalInfoData} deleteRow={deleteRow}></HistoryDetails>)
      : "No Records Found"
    }
    </>
  )
}

export default History

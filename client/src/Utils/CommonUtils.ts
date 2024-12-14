/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import store from '../store/store';
import { setLoading } from '../store/Slices/AppSlice';
import { axiosInstance } from './axios';
import { AnyObject } from '../Types/types';


export const generateId = ()=> {
    return uuidv4();
}

export const generateIdData = <T>(arr:T[]): (T & {id: string})[] => {
    return arr.map((data)=> ({...data, id: generateId()}))
}

interface CallAPIProps {
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    error?: ()=> void;
    success?: (res: any)=> void; 
}

export const CallAPI = async({method,url, error, success}: CallAPIProps) =>{
    try{
      store.dispatch(setLoading(true))
        const res = await axiosInstance[method](url);
        console.log("ayy check CallAPI Response", location)
        if(res.data.status === 'success'){
        success && success(res)
        } 
    }
    catch(e){
        console.log("Error In CallAPI", e)
        error && error()
    }
    finally{
        store.dispatch(setLoading(false))
    }
  }

  export const getFormDataResponse = <T extends AnyObject>(form: T[], document:AnyObject, obj:AnyObject): void => {
    form.map((formdata)=> {
        obj[formdata.name] = document[formdata.name] || ''
      })
  }
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef, SetStateAction, useState } from 'react'
import Btn from './Btn';
import AddIcon from '@mui/icons-material/Add';

interface ButtonGroupProps extends ComponentPropsWithoutRef<'input'>{
    label: string;
    id: string;
    name: string; 
    setList: SetStateAction<any>
}


function ButtonGroup({label, name, id, setList}:ButtonGroupProps){
  const [input, setInput] = useState('')

  const updateState = () =>{
    setList((prev:any) => {
      if(input==='' || prev.includes(input)) return prev;
      return [...prev, input]
    })
    setInput('')
  }


  return (
    <>
    <label htmlFor={id} className="block text-gray-900 text-md font-medium mb-1">{label}</label>
    <div className='flex md:w-2/5 w-full'>
    <input name={name} value={input} id={id} onChange={(e)=> setInput(e.target.value)} className={`bg-gray-100 block w-full rounded-md md:p-1  sm:text-sm`}/>
    <Btn type='button' className="mb-2" btnClassName="" onClick={updateState}><AddIcon sx={{ fontSize: 15 }}></AddIcon></Btn>
    </div>
    </>
  )
}

export default ButtonGroup
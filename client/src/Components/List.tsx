/* eslint-disable @typescript-eslint/no-explicit-any */
import ClearIcon from '@mui/icons-material/Clear';
import { SetStateAction } from 'react';

interface ListProps {
  List:string[];
  className? : string;
  clearNeeded?: boolean;
  setList?: SetStateAction<any>
}

const List = ({List = [], className, clearNeeded, setList}:ListProps) => {
  return (
    <>
    <div className='flex flex-wrap gap-2 items-center pt-1'>
    {
        List.map((item)=> {
            return(
              <>
                <p className={`py-1 px-2 bg-primary text-slate-500 rounded skillItems ${className}`}>
                    {item}
                {
                clearNeeded &&
                <button type='button' className='ml-1' onClick={()=> setList((strArr: any[])=> strArr.filter((value: string)=>item!==value))}><ClearIcon sx={{fontSize: 12}}></ClearIcon></button>
                }
                </p>
              </>
            )
        })
    }
    </div>
    </>
  )
}

export default List
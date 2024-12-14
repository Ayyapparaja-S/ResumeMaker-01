/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, SetStateAction, type ComponentPropsWithoutRef } from "react";

type dataProps = {
  [key in any]: any;
};

interface InputProps extends ComponentPropsWithoutRef<'input'>{
    label?: string;
    id?: string;
    name: string; 
    setter: SetStateAction<any>;
    component: object;
    data: dataProps
}



const ControlledInput = ({label, id, name, setter, data,  ...otherProps}: InputProps) => {

  const value = data[name]

    const onChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const name = e.target.name
        const value = e.target.value
        setter((prev: any)=> {
           const newArr  = prev.map((data: any)=> {
                if(data.id===id){
                  return {...data, [name]: value }
                }
                return data;
            })
           return newArr
        })
    }

  return (
    <div>
        <label htmlFor={id} className="block text-gray-900 text-md font-medium mb-1">{label}</label>
        <input name={name} {...otherProps} id={id} className={`bg-gray-100 block w-full rounded-md md:p-1  sm:text-sm`} value={value} onChange={onChange}/>
    </div>
  )
}

export default ControlledInput
import { forwardRef, type ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<'input'>{
    label: string;
    id: string;
    name: string; 
}



const Input = forwardRef(({label, id, name, className, ...otherProps}: InputProps, ref) => {

  return (
    <div className={className}>
        <label htmlFor={id} className="block text-gray-900 text-md font-medium mb-1">{label}</label>
        <input name={name} {...otherProps} id={id} className={`bg-gray-100 block w-full rounded-md md:p-1  sm:text-sm`} ref={ref as React.Ref<HTMLInputElement>}/>
    </div>
  )
})

export default Input
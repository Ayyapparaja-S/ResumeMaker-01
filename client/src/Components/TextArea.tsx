import { ComponentPropsWithoutRef, forwardRef } from "react"

interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'>{
    label: string;
    id: string;
    name: string; 
}

const TextArea = forwardRef(({label, id, name, className,...otherProps}: TextAreaProps, ref) => {
  return (
    <div className={className}>
        <label htmlFor={id} className="block text-gray-900 text-md font-medium mb-1">{label}</label>
    <textarea ref={ref as React.Ref<HTMLTextAreaElement>} name={name} {...otherProps} id={id} className={`bg-gray-100 block w-full rounded-md md:p-1  sm:text-sm`}></textarea>
    </div>
  )
})

export default TextArea
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Input from './Input'
import { FormDataProps } from '../Types/types';


interface InputValidatorProps extends FormDataProps{
  component: FormDataProps,
  register:UseFormRegister<any>;
  errors: FieldErrors<any>;
}

// errors[name]?.type? in errorMessages

function InputValidator({component, name,validations,register,errors,...rest}: InputValidatorProps) {
  const errorMessage = component.errorMessages?.[errors[component.name]?.type as keyof typeof component.errorMessages];
  console.log("ayy check InputValidator", component)
  const errorMsg = <p role="alert"  className=" text-red-500 company font-medium mt-1">{errorMessage}</p>;

  return (
    <>
    <div>
    <Input
             {...rest}
            {...register(name, validations)}
            aria-invalid={errors[name] ? "true" : "false"}
            ></Input>
            {errorMsg}
    </div>
    </>
  )
}

export default InputValidator;
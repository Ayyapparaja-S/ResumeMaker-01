/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, UseFormRegister } from "react-hook-form";
import InputValidator from "../Components/InputValidator";
import { FormDataProps } from "../Types/types";

interface RenderComponentProps<T, U>{
    register: T;
    errors: U;
    components: FormDataProps[];
}

function RenderComponent<T extends UseFormRegister<any> , U extends FieldErrors<any> >({components,register, errors}: RenderComponentProps<T, U>){
    return(
        <>
        {components.map((component)=> {
            return (<InputValidator key={component.uid} register={register} errors={errors} {...component} component={component}></InputValidator>)
        })}
        </>
    )
}

export default RenderComponent;
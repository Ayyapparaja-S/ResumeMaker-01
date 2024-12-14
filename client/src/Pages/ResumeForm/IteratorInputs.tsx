/* eslint-disable @typescript-eslint/no-explicit-any */

import { SetStateAction } from "react"
import ControlledInput from "../../Components/ControlledInput"
import { FormDataProps } from "../../Types/types"
import DeleteIcon from '@mui/icons-material/Delete';
import Btn from "../../Components/Btn";
import { generateId } from "../../Utils/CommonUtils";
import AddIcon from '@mui/icons-material/Add';

interface IteratorInputsProps<T extends object> {
    dataList: T[],
    setter: SetStateAction<any>,
    components: FormDataProps[],
    dataModel: T,
    IteratorClassName? :string
}


function IteratorInputs<T extends object>({dataModel, dataList, setter, components, IteratorClassName}: IteratorInputsProps<T>){

    console.log("ayy check IteratorInputs", dataList)

    const addRow = () => {
        setter((prev: any)=> [...prev, {...dataModel, id: generateId()}])
    }

    const deleteRow = (id: string) => {
        console.log(" newset 0", id)
        setter((prev: any)=> {
            console.log(" prevset", prev)
            const newSet = prev.filter((data: any)=> data.id !== id)
            console.log(" newset", newSet)
            return newSet
        })
    }


  return (
    <>
    <div className="md:col-span-3 sm:col-span-2">
    <div>
        {
            dataList.map((data: any)=> {
                return (
                    <div className={`md:gap-3 gap-2 mb-2 IteratorComponent IteratorIndex`} key={data.id}>
                    <div className={`${IteratorClassName} grid gap-2`}>
                    {
                        components.map((component) => <ControlledInput key={component.uid} setter={setter} data={data} {...component} component={component} id={data.id}></ControlledInput>)
                    }
                    </div>
                    <Btn type='button' className="place-self-end justify-self-end self-end deleteBtn" btnClassName="roundedBtn" onClick={()=> deleteRow(data.id)}><DeleteIcon sx={{ fontSize: 15 }}></DeleteIcon></Btn>
                </div>
                )
            })
        }
    </div>
    <Btn type='button' onClick={addRow} className="mb-2" btnClassName="rounded-[25px] addBtn roundedBtn"><AddIcon sx={{ fontSize: 15 }}></AddIcon></Btn>
    </div>
    </>
  )
}

export default IteratorInputs
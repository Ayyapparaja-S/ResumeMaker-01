/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from 'react'
import ButtonGroup from './ButtonGroup'
import List from './List';

interface ListInputProps{
    label: string;
    id: string;
    name: string; 
    setList: SetStateAction<any>;
    list: string[]
}



const ListInput = ({label, name, id, setList, list}: ListInputProps) => {
    

  return (
    <>
    <ButtonGroup label={label} name={name}  id={id} setList={setList}></ButtonGroup>
    <List List={list} className='skillandtools' setList={setList} clearNeeded={true}></List>
    </>
  )
}

export default ListInput
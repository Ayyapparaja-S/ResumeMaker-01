import { documentProps } from '../../Types/types'
import EditIcon from '@mui/icons-material/Edit';
import Btn from '../../Components/Btn';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const HistoryDetails = ({data, deleteRow}: {data: documentProps, deleteRow: (id: string)=> void}) => {

  return (
    <>
    <div className='flex items-center p-3 justify-between rounded-lg shadow-lg gap-3'>
       <h4>{data.templatename}</h4>
       <p>{data.name}</p>
       <div className='flex gap-2'>
       <Link to={`/details/${data._id}/PersonalInfo`}><Btn type='button' className="" btnClassName=""><EditIcon sx={{ fontSize: 15 }}></EditIcon></Btn></Link>
       <Btn type='button' className="" btnClassName="" onClick={()=> deleteRow(data._id as string)}><DeleteIcon sx={{ fontSize: 15 }}></DeleteIcon></Btn>
       </div>
    </div>
    </>
  )
}

export default HistoryDetails
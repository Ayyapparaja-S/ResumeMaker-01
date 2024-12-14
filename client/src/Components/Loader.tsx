import { useAppSelector } from "../store/hooks"

const Loader = ()=>{
   const {App} =  useAppSelector(state=> state)
   if(!App.loading) return null;
    return (
    <div className='overlay'>
    <div className="spinner"></div>
</div>)}

export default Loader
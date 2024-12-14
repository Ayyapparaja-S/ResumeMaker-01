import Panner from './Panner'
import { Outlet } from 'react-router-dom'
import Loader from '../Components/Loader'

const HomeLayout = () => {
  return (
    <>
    <Panner></Panner>
    <Outlet></Outlet>
    <Loader></Loader>
    </>
  )
}

export default HomeLayout
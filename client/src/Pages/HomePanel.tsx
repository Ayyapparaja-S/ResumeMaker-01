import Loader from '../Components/Loader'
import { ReactNode } from 'react'

const HomePanel = ({children}: {children: ReactNode}) => {
  return (
    <>
    <div id='login' className="h-full w-full flex justify-center items-center fixed top-0 left-0 overlay">
        <div className="p-5 shadow-lg xl:w-1/4 lg:3/6 md:w-2/4 w-11/12 bg-white rounded-md">
        {children}
        </div>
    </div>
    <Loader></Loader>
    </>
  )
}

export default HomePanel
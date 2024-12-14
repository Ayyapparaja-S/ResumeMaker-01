import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
     {/* <div id='login' className="h-screen w-full flex justify-center items-center">
        <div className="p-5 shadow-lg xl:w-1/4 lg:3/6 md:w-2/4 w-11/12 bg-white rounded-md justify-center flex flex-col items-center"> */}
        <h5 className='py-2 font-bold text-center text-xl mb-2'>Page Not Found</h5>
        <Link to="/login" className="text-white bg-primaryDark py-2 px-3 rounded-md">Login</Link>
         {/* </div>
    </div> */}
    </>
  )
}

export default PageNotFound
import { Link } from 'react-router-dom'

const StartNew = () => {
  return (
    <div className='StartNew w-full flex justify-center items-center flex-col h-screen'>
        <h5 className='text-inherit font-bold text-white md:text-4xl text-xl mb-2'>Start Build Your Own Resume</h5>
        <div className='flex gap-3'>
        <Link to='CreateNew' className='bg-black text-white rounded-lg md:p-3 p-2'>Create Resume</Link>
        <Link to='/history' className='historylink bg-transparent hover:text-white border-black hover:bg-black text-black rounded-lg md:p-3 p-2'>Edit Template</Link>
        </div>
    </div>
  )
}

export default StartNew
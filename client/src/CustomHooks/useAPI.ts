import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const useAPI = () => {
    const [error, setError] = useState("")

   const navigate = useNavigate()
   
  return { error,setError, navigate}
}

export default useAPI
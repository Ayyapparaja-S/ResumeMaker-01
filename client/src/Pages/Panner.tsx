/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import Btn from "../Components/Btn"
import LinkTo from "../Components/NavLink"
import MenuIcon from '@mui/icons-material/Menu';
import { useLayoutEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { CallAPI } from "../Utils/CommonUtils";

const Panner = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const [navheight, setNavHeight] = useState(0)
  const navRef = useRef<HTMLElement | null>(null)

  const closeModal = () =>{
   show && setShow(false)
 }

 useLayoutEffect(()=> {
 const sizes =  navRef?.current?.getBoundingClientRect()

 console.log("Ayy check Panner.js", sizes)

 if(sizes)
 setNavHeight(sizes.height)
 },[])

  // useEffect(()=> {
  //  const root= document.getElementById("root")!
  //     root.addEventListener("click", closeModal)
  //   return () => {
  //     root?.removeEventListener("click", closeModal)
  //   }
  // },[])

  
  const success = (res: any) => {
    if(res.data?.status && res.data.status==='success') {
      sessionStorage.setItem("auth", 'N')
      navigate('/login')
    }
  }

  const logout = () =>{
    CallAPI({method: 'post', url: `users/logout`,success})
  }
  
console.log("ayy check navRef", navheight)

  return (
    <nav className="bg-primaryDark p-5  md:m-2 md:rounded-lg text-white" id="noPrint" ref={navRef}>
    <div className="flex row items-center justify-between">
    <div className='text-white md:font-bold font-semibold md:text-2xl text-lg' >
        Resume Maker 😍🚀
    </div>
    <div className="md:flex gap-5 hidden">
      <LinkTo to='/' className="">Home</LinkTo>
      <LinkTo to='/history'  className="">History</LinkTo>
      {/* <LinkTo to='/about'  className="">About</LinkTo> */}
    </div>
    <div className="md:block hidden">
      <Btn type='button' onClick={logout}>Log Out</Btn>
    </div>
    <div className="md:hidden gap-5 flex">
      {
        show ?
        <button onClick={()=> setShow(false)}> <CloseIcon></CloseIcon></button>:
      <button onClick={()=>setShow(true)}> <MenuIcon></MenuIcon></button>
      }
    </div>
    </div>
    {
      show &&  
      // <Modal>
      <div className="md:hidden block text-black">
      <div className="flex gap-2 p-3 md:hidden flex-col bg-white text-center justify-center items-stretch"> 
      <Link to='/' className="rounded bg-primary p-2" onClick={closeModal}>Home</Link>
      <Link to='/history'  className="rounded bg-primary p-2"  onClick={closeModal}>History</Link>
      <button type='button' className="rounded bg-primary p-2" onClick={logout}>Log Out</button>
      {/* <LinkTo to='/about'  className="">About</LinkTo> */}
      </div>
      </div>
      // </Modal>
    }
    </nav>
  )
}

export default Panner
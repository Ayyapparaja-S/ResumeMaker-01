import CallIcon from '@mui/icons-material/Call';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MainProps } from './Main';

const Header = ({data}:MainProps) => {
  return (
   <div className='flex flex-col gap-2 pb-3'>
   <header className='flex flex-col text-center'>
    <h1 className='font-bold uppercase profilename text-3xl mb-0 text-center'>{data.name}</h1>
    <h5 className='text-primary font-bold text-base'>{data.role}</h5>
    </header>
    <div id='Contact-Information' className='flex flex-wrap gap-4 items-center justify-center'>
    <div className='contact-single-info'>
        <CallIcon className='contact-icons'/>
        <span>(+91) {data.mobile}</span>
    </div>
    <div className='contact-single-info'>
        <AlternateEmailIcon  className='contact-icons'/>
        <span>{data.email}</span>
    </div>
    <div className='contact-single-info'>
          <LinkedInIcon  className='contact-icons'/>
          <span><a href={data.linkedinlink} target='_blank'>{data.linkedinlabel}</a></span>
    </div>
    <div className='contact-single-info'>
          <LocationOnIcon  className='contact-icons'/>
          <span>{data.address}</span>
    </div>
    </div>
    </div>
  )
}

export default Header
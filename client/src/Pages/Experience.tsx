import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ExperienceProps } from '../Types/types';


const Experience = ({role, company, startDate, endDate, points=[], content}: Partial<ExperienceProps>) => {
  return (
    <div className='py-2'>
    <h5 className='text-inherit font-bold text-sm mb-1 text-black'>{role}</h5>
    <h5 className='text-primary font-bold company'>{company}</h5>
    <div className='flex items-center mb-1'>
    <CalendarMonthIcon className='text-slate-500 calender mr-1'></CalendarMonthIcon>
    <p className='text-slate-500 roledate' >{startDate} - {endDate}</p>
    </div>
    <p className='section-content'>{content}</p>
    {
    points.length > 0 &&
    <ul className='bullet' style={{listStylePosition: "outside"}}>
        {
            points.map(({subhead, subcontent})=> {
            return(
                <li style={{textIndent: '-20px', paddingLeft: '20px'}}>
                    <div className='list-item my-1'>
                    <p className='section-content inline'><strong className='font-bold text-black'>{subhead}</strong>{subhead && ':  '} {subcontent}</p>
                    </div>
                </li>
            )
        })
        }
    </ul>
    }
    </div>
  )
}

export default Experience
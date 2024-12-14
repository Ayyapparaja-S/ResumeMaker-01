import { ReactNode } from 'react'

interface SectionProps {
  id: string;
  heading: string;
  children: ReactNode;
}

const Section = ({id, heading, children}: SectionProps) => {
  return (
   <section id={id} className='py-2'>
        <h5 className='sectionheading uppercase text-inherit font-semibold text-sm border-b-inherit border-slate-200 py-1 text-[#8C8F92]' >{heading}</h5>
        {children}
   </section>
  )
}

export default Section
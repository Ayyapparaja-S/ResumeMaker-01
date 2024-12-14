// import React from 'react'
import Section from '../Components/Section';
import List from '../Components/List'
import Experience from './Experience'
import { MainProps } from './Main';

// const skills = ['React.Js', 'Redux' , 'Node.Js','Express', 'Restful Web APIs', 'Javascript', 'TypeScript', 'ES6+', 'MongoDB', 'MySQL', 'Tailwind', 'Bootstrap', 'MUI', 'Jwt', 'HTML5', 'CSS3']

// const tools = ['VS Code', 'Eclipse', 'Git', 'Postman', 'Workbench','MongoDB Compass','Jenkins', 'JIRA', 'React Dev Tools']

const SideSection = ({data}:MainProps) => {
  return (
   <>
   <Section id="skills" heading='skills'>
   <List List={data.skills}></List>
   </Section>
   <Section id="tools" heading='Tools'>
   <List List={data.tools}></List>
   </Section>
   <Section id="education" heading='Education'>
    {
      data.education.map((educationData)=> {
       return <Experience
        role={`${educationData.course} - ${educationData.specialization}`}
        company={educationData.college}
        startDate={educationData.startDate}
        endDate={educationData.endDate}
        content={`Grade - ${educationData.grade}`}
        ></Experience>
      })
    }
   </Section>
   </>
  )
}

export default SideSection
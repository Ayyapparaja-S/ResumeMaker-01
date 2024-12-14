import Section from '../Components/Section'
import Summary from './Summary'
import Experience from './Experience'
// import { Points } from '../Types/types'
import { MainProps } from './Main'
import List from '../Components/List'




// const seniorpoints:Points["points"] = [
//     // {
//     //     subhead: 'Project Management Tool',
//     //     subcontent: 'Designed and implemented the user interface using JSON for dynamic data rendering. Which reduce time of Developing the UI by 40%'
//     // },
//     // {
//     //     subhead: 'Led Development Teams',
//     //     subcontent: 'Led a team of 5 members in the development of a project management tool using React.js.'
//     // },
//     {
//         subhead: 'Performance Optimization',
//         subcontent: 'Improved frontend performance by 30% using techniques such as List Virtualization, useMemo, useContext, lazy loading, caching, and table data prefetching.'
//     },
//     {
//         subhead: 'Data Caching',
//         subcontent: 'Implemented data caching using RTK Query and React Query for efficient data fetching and state management.'
//     },
//     {
//         subhead: 'Authentication',
//         subcontent: 'Implemented JWT and OAuth for robust authentication.'
//     },
//     {
//         subhead: 'Security',
//         subcontent: 'Increased security standards by integrating logging and monitoring tools, implementing rate limiting, and handling concurrent requests.'
//     },
//     // {
//     //     subhead: 'Payment Integration',
//     //     subcontent: 'Payment Integration: Integrated payment gateways using Stripe.'
//     // },
// ]

// const midseniorpoints = [
//     {
//         subhead: 'Design Patterns',
//         subcontent: 'Designed and implemented applications using React design principles, including Higher-Order Components (HOCs) and Custom Hooks, ensuring code reusability and maintainability.'
//     },
//     {
//         subhead: 'Component Development',
//         subcontent: 'Created 25+ responsive components with functionalities such as drag and drop and multi-file uploaders.'
//     }
// ]

// const associatePoints = [
//     {
//         subhead: 'Advanced JavaScript',
//         subcontent: 'Utilized ES6+ features and data structures and algorithms (DSA) for efficient JavaScript coding'
//     }
// ]

const points = [
  {
    subcontent: 'Highly skilled full-stack web developer with over 3+ years of experience building and deploying scalable web applications and APIs using ReactJS, Node.js, MongoDB, and TypeScript.'
  },
  {
    subcontent: 'Expertise in architecting robust frontend solutions with Redux and optimizing backend performance with Mongoose and Express.js.'
  },
  {
    subcontent: 'Adept at designing modular, reusable components, ensuring maintainable codebases, and implementing best practices in agile environments.'
  },
  // {
  //   subcontent: 'Experienced in leading cross-functional teams, mentoring junior developers, and collaborating with stakeholders to deliver high-quality solutions that drive business outcomes.'
  // }
]

const skillpoints = [
  {
    subhead: 'Front-End Development',
    subcontent: 'ReactJS, JavaScript (ES6+), Redux, TypeScript, HTML5, CSS3, SCSS, MUI, Tailwind CSS, Bootstrap'
  },
  {
    subhead: 'Back-End Development',
    subcontent: 'Node.js, Express.js, RESTful APIs'
  },
  {
    subhead: 'Databases',
    subcontent: 'MongoDB, Mongoose, MySQL'
  },
  {
    subhead: 'Version Control',
    subcontent: 'Git, GitHub'
  },
  {
    subhead: 'Tools & Technologies',
    subcontent: 'VS Code, Eclipse, MongoDB Compass, Workbench, Postman, React Dev Tools, JWT, Webpack, Babel'
  },
  {

    subhead: 'CI/CD/Work Collaboration Tools ',
    subcontent: 'Jenkins, Jira, Bugzilla, Microsoft Teams.'
  }
]

const experience = [
  {
    subcontent: 'Designed and developed applications using agile methodologies, ensuring timely delivery of milestones.'
  },
  {
    subcontent: 'Improved application performance by optimizing React components, leveraging React Query for caching, and enhancing Redux Toolkit usage.'
  },
  {
    subcontent: 'Optimized existing SQL queries to improve backend performance and data retrieval speed.'
  },
  {
    subcontent: 'Applied design patterns and algorithms to ensure reusable, maintainable, and efficient code.'
  },
  {
    subcontent: 'Deployed applications across development, QA, staging, and production environments using Jenkins.'
  },
  {
    subcontent: 'Designed and implemented RESTful APIs and integrated them seamlessly with frontend applications.'
  },
  {
    subcontent: 'Worked closely with stakeholders throughout the SDLC, from planning and requirement gathering to design, development, and delivery.'
  },
  {
    subcontent: 'Monitored system performance, identified bottlenecks, and implemented improvements for scalability and reliability.'
  },
  {
    subcontent: 'Ensured version control and smooth collaboration using Git and GitHub workflows.'
  }
]
   
const projects = [
  {
    tech: "React.js, Redux, Node.js, Express, MySQL",
    client: 'Orchid Insurance | Duration: October 2021 - March 2022] | Role: FrontEnd Developer',
    company: "Homeowners Insurance Platform Development",
    content: 'Developed a robust digital platform for Orchid Insurance to facilitate the quoting and policy creation process for homeowners insurance. The system supported multiple policy types (e.g., HO3, HO5, HO6, DP3, X-Wind) with flexible coverage and deductible options while adhering to state-specific regulations.',
    points: [
      {
      subcontent: 'Designed and implemented frontend features, including automated renewal policies and management consoles, using React.js.'
      },
      {
        subcontent: 'Utilized React patterns to build reusable Higher-Order Components (HOC), improving code maintainability and scalability.'
      },
      {
        subcontent: 'Built SSO login functionality in Node.js, enhancing user authentication and security.'
      },
      {
        subcontent: 'Managed deployment pipelines and handled end-to-end release responsibilities from development to production environments.'
      },
    ]
  }
]
const MainSection = ({data}:MainProps) => {
  return (
    <>
    <Section id='summary' heading='Professional Summary'>
    <Summary summary={data.summary} points={points}></Summary>
    </Section>
    <Section id="skills" heading='skills'>
    <Summary summary={data.summary} points={skillpoints}></Summary>
    {/* <List List={data.skills}></List> */}
    </Section>
    <Section id='experience' heading='Experience'>
        {
            [data.experience[0]].map((experienceData)=> {
                const {role,company,startDate,endDate,content, points} = experienceData
               return <Experience
                role={role}
                company={company}
                startDate={startDate}
                endDate={endDate}
                content={content}
                points={experience}
                ></Experience>
            })
        }
    </Section>
    <Section id="education" heading='Education'>
    {
      data.education.map((educationData)=> {
       return <Experience
        role={`${educationData.course} - ${educationData.specialization}`}
        company={educationData.college}
        startDate={educationData.startDate}
        endDate={educationData.endDate}
        content={`${educationData.grade}`}
        ></Experience>
      })
    }
   </Section>
   <Section id='experience' heading='Experience'>
        {
            projects.map((experienceData)=> {
                const {client,tech,company,content, points} = experienceData
                return (
                  <div className='py-2'>
                  <h5 className='text-inherit font-bold text-sm mb-1 text-black'>{company}</h5>
                  <div className='my-1'>
                  <p className='section-content' style={{fontSize: "0.7rem"}}><strong className='font-bold text-black' style={{fontStyle: "italic"}}>Client:  </strong>{client}</p>

                  <p className='section-content' style={{fontSize: "0.7rem"}}><strong className='font-bold text-black' style={{fontStyle: "italic"}}>Tech Stack:  </strong>{tech}</p>
                  </div>
                            
                  {/* <h5 className='text-primary font-bold company'>{company}</h5> */}
                  {/* <div className='flex items-center mb-1'> */}
                  {/* <CalendarMonthIcon className='text-slate-500 calender mr-1'></CalendarMonthIcon> */}
                  {/* <p className='text-slate-500 roledate' >{startDate} - {endDate}</p> */}
                  {/* </div> */}
                 
                  <p className='section-content'>{content}</p>
                  <div className='my-1'>
                  <p className='section-content'><strong className='font-bold text-black' >Key Contributions:  </strong></p>
                  </div>
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
            })
        }
    </Section>
    </>
  )
}

{/* <Experience
        role='Senior Software Engineer'
        company='Solartis Technology Services Pvt.Ltd'
        startDate='April 2024'
        endDate='Current'
        content='Successfully led a major project as part of a team, earning the Stellar Performer Award in 2023. Guided project milestones and completed four dashboard projects. Designed and implemented a dynamic user interface for a project management tool using JSON, reducing UI development time by 40%.'
        points={seniorpoints}
        ></Experience>
        <Experience
        role='Software Engineer'
        company='Solartis Technology Services Pvt.Ltd'
        startDate='Sep 2022'
        endDate='April 2024'
        content='Developed and maintained full stack web applications using the MERN stack (MongoDB, Express, React, Node.js).'
        points={midseniorpoints}
        ></Experience>
        <Experience
        role='Associate Software Engineer'
        company='Solartis Technology Services Pvt.Ltd'
        startDate='Sep 2021'
        endDate=' Sep 2022'
        content='Used React, Redux, and React Hooks to implement state management with Redux and Context API for efficient data handling. Integrated APIs in the frontend and developed and optimized REST APIs using Node.js and Express.js.'
        points={associatePoints}
        ></Experience> */}

export default MainSection
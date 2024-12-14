
interface SummaryProps {summary: string,points:{subhead?:string, subcontent?: string}[]}

const Summary = ({summary,points=[]}: SummaryProps) => {
  return (
    // <p className='section-content'>
    //     {summary} 
    // </p>
    <>
     {
    points.length > 0 &&
    <ul className='bullet' style={{listStylePosition: "outside"}}>
        {
            points.map(({subhead, subcontent})=> {
            return(
                <li style={{textIndent: '-20px', paddingLeft: '20px'}}>
                    <div className='list-item my-1'>
                    <p className='section-content inline' >
                      <strong className='font-bold text-black'>{subhead}</strong>
                      {subhead ? ':  ': ''} 
                      {subcontent}</p>
                    </div>
                </li>
            )
        })
        }
    </ul>
    }
    </>
  )
}

export default Summary
import { documentProps } from '../Types/types'
import Header from './Header'
import MainSection from './MainSection'
import SideSection from './SideSection'

export interface MainProps {
  data: documentProps
}

const Main = ({data}:MainProps) => {
  return (
    <main id="resume">
      <Header data={data}></Header>
      <div className='flex gap-x-10 flex-wrap justify-center'>
      <section className='w-full main-section'>
        <MainSection  data={data}></MainSection>
      </section>
      {/* <aside className='grow side-section'>
        <SideSection  data={data}></SideSection>
      </aside> */}
      </div>
    </main>
  )
}

export default Main
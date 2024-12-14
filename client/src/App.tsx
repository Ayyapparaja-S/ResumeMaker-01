import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/css/style.css'
// import Main from './Pages/Main.js';
import StartNew from './Pages/ResumeForm/StartNew.js';
import SkillDetails from './Pages/ResumeForm/SkillDetails.js';
import HomePanel from './Pages/HomePanel.js';
import Login from './Pages/Login.js'
import SignUp from './Pages/SignUp.js';
import PageNotFound from './Pages/PageNotFound.js';
import store from './store/store.js';
import { Provider } from 'react-redux';
import PersonalDetails from './Pages/ResumeForm/PersonalDetails.js';
import { Auth } from './Utils/LoaderUtils.js';
import PreviewResume from './Pages/PreviewResume.js';
import HomeLayout from './Pages/HomeLayout.js';
import CreateNew from './Pages/ResumeForm/CreateNew.js';
import ResumeDetails from './Pages/ResumeForm/ResumeDetails.js';
import ExperienceWrapper from './Pages/ResumeForm/ExperienceWrapper.js';
import EducationWrapper from './Pages/ResumeForm/EducationWrapper.js';
import History from './Pages/ResumeForm/History.js';


const formRoutes = [
  // {
  //   index: true,
  //   element: <StartNew></StartNew>,
  //   loader: Auth,
  // },
  {
    path: 'PersonalInfo',
    element: <PersonalDetails></PersonalDetails>,
    loader: Auth,
    index: true
  },
  {
    path: 'Experience',
    element: <ExperienceWrapper></ExperienceWrapper>,
    loader: Auth
  },
  {
    path: 'Skills',
    element: <SkillDetails></SkillDetails>,
    loader: Auth
  },
  // {
  //   path: 'Tools',
  //   element: <ToolsDetails></ToolsDetails>,
  //   loader: Auth
  // },
  {
    path: 'Education',
    element: <EducationWrapper></EducationWrapper>,
    loader: Auth
  }
]


const router = createBrowserRouter([
  {
    path: '/login',
    element: <HomePanel><Login></Login></HomePanel>,
  },
  {
    path: '/signup',
    element: <HomePanel><SignUp></SignUp></HomePanel>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  },
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    loader: Auth,
    children: [
      {
        element: <StartNew></StartNew>,
        loader: Auth,
        index: true,
        // children: [
        //   {
        //     index: true,
        //     element: <StartNew></StartNew>,
        //     loader: Auth,
        //   }
        // ]
      },
      {
        path: '/Preview/:id',
        element: <PreviewResume></PreviewResume>,
        loader: Auth,
      },
      {
        path: '/CreateNew',
        element: <CreateNew></CreateNew>,
        loader: Auth,
      },
      {
        path: '/history',
        element: <History></History>,
        loader: Auth,
      },
      {
        path: '/details/:id',
        element: <ResumeDetails className='md:py-5' id='no-print'></ResumeDetails>,
        loader: Auth,
        children: formRoutes
      }
    ]
}
])


function App() {

  return (
  <Provider store={store}>
  <RouterProvider router={router}></RouterProvider>
  </Provider>
  );
}

export default App
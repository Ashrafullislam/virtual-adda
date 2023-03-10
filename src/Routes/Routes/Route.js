import { createBrowserRouter } from "react-router-dom" ;
import Main from "../../Layout/Main/Main";
import About from "../../Pages/About/About/About";
import AboutMeUpdate from "../../Pages/About/AboutMeUpdate";
import Home from "../../Pages/Home/Home/Home";
import Media from "../../Pages/Media/Media/Media";
import Messaging from "../../Pages/Messaging/Messaging";
import Login from "../../Pages/Register/Login";
import SignUp from "../../Pages/Register/SignUp";

const router = createBrowserRouter([
    {
        path:'/', element: <Main > </Main> ,  children: [
            {
                path: '/', element: <Home  >  </Home>
            },
            {
                path: '/home', element: <Home  >  </Home>
            },
            {
                path: '/media', element: <Media  > </Media>
            },
            {
                path: '/about', element: <About> </About>
            },
            {
                path: '/aboutmeupdate', element:<AboutMeUpdate > </AboutMeUpdate>
            },
            {
                path: '/messaging', element: <Messaging > </Messaging>
            },
            {
                path: '/login', element: <Login >  </Login>
            },
            {
                path: '/signup', element:  <SignUp > </SignUp>
            },
            {
                path: '/', element: <div> Routes not  found   </div>
            }
        ]
    }
])

export default router ;
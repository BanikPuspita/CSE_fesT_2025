import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Job from "../Pages/Job/Job";
import Signup from "../Pages/Shared/Registration/Signup/Signup";
import Login from "../Pages/Shared/Registration/Login/Login";
import Cgpa from "../Pages/Save Cgpa/Cgpa";
import Skills from "../Pages/Skills/Skills";



export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/job",
                element:<Job/>,
            },
            {
                path:"/signup",
                element:<Signup/>,
            },
            {
                path:"/login",
                element:<Login/>,
            },
            {
                path:"/cgpa",
                element:<Cgpa/>,
            },
            {
                path:"/skills",
                element:<Skills/>
            },
            
        ]

    }
])
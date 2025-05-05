import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Job from "../Pages/Job/Job";
import Signup from "../Pages/Shared/Registration/Signup/Signup";
import Login from "../Pages/Shared/Registration/Login/Login";
import Cgpa from "../Pages/Save Cgpa/Cgpa";
import StudyOrganizer from "../Pages/Save Cgpa/StudyOrganizer/StudyOrganizer";
import StartLife from "../Pages/StartLife/StartLife";
import Skills from "../Pages/Skills/Skills";
import Movie from "../Pages/Movie/Movie";
import Therapist from "../Pages/Therapist/Therapist";
import AdminLayout from "../Layout/AdminLayout";
import AdminHome from "../Pages/AdminPages/AdminHome/AdminHome";
import Marathon from "../Pages/Marathon/Marathon";
import GymBuddy from "../Pages/GymBuddy/GymBuddy";
import AdminMovie from "../Pages/AdminPages/AdminMovie/AdminMovie";



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
                path:"/marathon",
                element:<Marathon/>,
            },
            {
                path:"/gymbuddy",
                element:<GymBuddy/>,
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
                path:"/study",
                element:<StudyOrganizer/>,
            },
            {
                path:"/startlife",
                element:<StartLife/>,
            },
            {
                path:"/skills",
                element:<Skills/>,
            },
            {
                path:"/movie",
                element:<Movie/>,
            },
            {
                path:"/therapist",
                element:<Therapist/>,
            },
            {
                path:"/admin",
                element:<AdminLayout/>,
                children:[
                    {
                        path: "adminhome",
                        element: <AdminHome/>,
                     },
                     {
                        path: "adminmovie",
                        element: <AdminMovie/>,
                     },
                ]
            },
           


        ]

    }
])
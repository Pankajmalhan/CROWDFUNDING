import React from "react"
import { Routes,Route} from "react-router-dom"
import { Main } from "./Home/Main";
import { Projects } from "./Projects/Projects";
import { ProjectDetail } from "./Projects/ProjectDetails"
import { CreateProject } from "./Create/CreateProject";
export const ScreenRoute=()=>{
    return (

    <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/Projects' element={<Projects/>} />
        <Route path='/ProjectDetails' element={<ProjectDetail/>} />
        <Route path='/Create' element={<CreateProject/>} />
        <Route path='*' element={<Main/>} />

    </Routes>

    )
}

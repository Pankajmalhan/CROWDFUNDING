import React from "react"
import { Routes,Route} from "react-router-dom"
import { Main } from "./Home/Main";
import { Projects } from "./Projects/Projects";
import { About } from "./About/About";

export const ScreenRoute=()=>{
    return (

    <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/Projects' element={<Projects/>} />
        <Route path='/AboutUs' element={<About/>} />
        <Route path='*' element={<Main/>} />

    </Routes>

    )
}

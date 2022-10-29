import React ,{useState} from 'react'
import ProjectCard from '../../components/Cards/ProjectCard'
export const Projects = () =>{
    const data=[
        {
            title: "New Prj",
            description: "Dummy content added for the description"
        },
        {
            title: "New Prj1",
            description: "Prj 1Dummy content added for the description"
        },
        {
            title: "New Prj2",
            description: "Prj 2 Dummy content added for the description"
        },
        {
            title: "New Prj2",
            description: "Prj 2 Dummy content added for the description"
        },
        {
            title: "New Prj2",
            description: "Prj 2 Dummy content added for the description"
        }
    ]
    return (
        <div className= 'container'>
           
           <h1>Project</h1>
           {/* <div className='sub'> */}
            <div className="card-container">
            
        {data.map((item)=> <ProjectCard data={item} />)}
        </div>
            
        {/* </div>    */}
    </div>
    )
}
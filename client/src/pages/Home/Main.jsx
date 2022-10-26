import React from 'react'
import { Outlet } from 'react-router-dom'

export const Main = () =>{
    return (
        <>
        <div>
            <Outlet/>
            <h1>Hello</h1>
            
        </div>
        </>
    )
}
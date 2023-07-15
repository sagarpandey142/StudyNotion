import React from 'react'
import * as icons from "react-icons/vsc"
import {useLocation} from "react-router-dom"
import { NavLink,matchPath } from 'react-router-dom'

const SidebarLink = ({link,iconName}) => {
           const Icon=icons[iconName];

           const location=useLocation();

           const matchRoute=(route)=>{
                   return matchPath({path:route},location.pathname)
           }  

  return (
    <NavLink
    to={link.path}
    classname={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"} transition-all duration-00`} >

             <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50
             ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>

             </span>

             <div className='flex items-center gap-x-3 ml-3'>
                <Icon classname="text-lg"/>
                <p>{link.name}</p>
             </div>
    </NavLink>
  )
}

export default SidebarLink
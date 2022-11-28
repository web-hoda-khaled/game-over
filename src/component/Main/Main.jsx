import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from './../Navbar/Navbar';

export default function Main({crrUser , setCrrUser}) {



  return (
    <div>

     <Navbar crrUser={crrUser} setCrrUser={setCrrUser}/>

     <Outlet/>
    </div>
  )
}

import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import navbarStayle from './Navbar.module.css'
export default function Navbar({crrUser , setCrrUser}) {

let navigate= useNavigate()

function logOut(){

  let userChoice = window.confirm("Are You Sure :- You Wanna Logout ?")


  if(userChoice)
  {
    setCrrUser()
    navigate("/login")
  }
}






   
  return (
    <>
    <nav className={"navbar navbar-expand-lg fixed-top " + navbarStayle.navbar}>
  <div className="container">
    <Link className={"navbar-brand text-white " + navbarStayle.nav_logo} to=''>
     <img src="./img/logo.png" alt="logo" className={navbarStayle.logo}/>
     Game Over
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    


    {crrUser?        <ul className="navbar-nav ms-5 me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-white fw-fw-semibold " to='/home'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white-50 fw-fw-semibold" to='/all'>All</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link text-white-50 fw-fw-semibold dropdown-toggle" to='' role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Platforms 
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item " to='/pc'>pc</Link></li>
            <li><Link className="dropdown-item " to='/browser'>browser</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <Link className="nav-link text-white-50 fw-fw-semibold dropdown-toggle" to='' role="button" data-bs-toggle="dropdown" aria-expanded="false">
          sort-by 
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item " to='/sort/release-date'>release-date</Link></li>
            <li><Link className="dropdown-item " to='/sort/popularity'>popularity</Link></li>
            <li><Link className="dropdown-item " to='/sort/alphabetical'>alphabetical</Link></li>
            <li><Link className="dropdown-item " to='/sort/relevance'>relevance</Link></li>
          </ul>
        </li>


        <li className="nav-item dropdown">
          <Link className="nav-link text-white-50 fw-fw-semibold dropdown-toggle" to='' role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categories  
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to='/category/racing'>racing</Link></li>
            <li><Link className="dropdown-item" to='/category/sports'>sports</Link></li>
            <li><Link className="dropdown-item" to='/category/social'>social</Link></li>
            <li><Link className="dropdown-item" to='/category/shooter'>shooter</Link></li>
            <li><Link className="dropdown-item" to='/category/open-world'>open-world</Link></li>
            <li><Link className="dropdown-item" to='/category/zombie'>zombie</Link></li>
            <li><Link className="dropdown-item" to='/category/fantasy'>fantasy</Link></li>
            <li><Link className="dropdown-item" to='/category/action-rpg'>action-rpg</Link></li>
            <li><Link className="dropdown-item" to='/category/action'>action</Link></li>
            <li><Link className="dropdown-item" to='/category/flight'>flight</Link></li>
            <li><Link className="dropdown-item" to='/category/battle-royale'>battle-royale</Link></li>
          </ul>
        </li>
      </ul>:""}

      <div className='navbar-nav ms-5 mb-2 mb-lg-0 ms-auto'>
        {crrUser? <span className='btn btn-outline-info me-3 ' onClick={logOut} >Logout</span> : <>   <Link className='btn btn-outline-info me-3 mb-lg-0 mb-md-3 mb-sm-3 ' to="">Register</Link>
       <Link className='btn btn-outline-info me-3 ' to="/login">Login</Link></> }

      </div>

    </div>
  </div>
    </nav>
</>
  )
}

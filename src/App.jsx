import React, { useState  ,useEffect} from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Main from './component/Main/Main';
import Register from './component/Register/Register';
import Error from './component/Error/Error';
import Login from './component/Login/Login';
import Home from './component/Home/Home';
import All from './component/All/All';
import Pc from './component/Pc/Pc';
import Browser from './component/Browser/Browser';
import Details from './component/Details/Details';
import jwtDecode from 'jwt-decode';
import Sort from './component/Sort/Sort';
import Back from './component/Back/Back';
import Categories from './component/Categories/Categories';
import { Offline } from 'react-detect-offline';

export default function App() {

  const [logedUserData, setLogedUserData] = useState(null)






  function getLoggedUser() 
  {
    if (localStorage.getItem("tkn")!=null) {

      let tkn = localStorage.getItem("tkn")
      let userData = jwtDecode(tkn)
      setLogedUserData(userData)

      console.log(userData);
    }


  }



  function removeUserData(){
    localStorage.removeItem("tkn");
    setLogedUserData(null)
  }




  function checkUoser(){

    if(localStorage.getItem("tkn") != null && logedUserData == null){
      getLoggedUser() 
    }

  }
  

  useEffect(function() {
    checkUoser()
  }, [])
  


function ProuductedRoute(props){


  if (logedUserData == null) {
    return <> 
    <Back />
    </>
  }else{
    return<>
      {props.children}
    </>
  }


}



  const router = createBrowserRouter([
    {path:"" , element: <Main crrUser={logedUserData} setCrrUser={removeUserData}/> , children:[
      {index:true , element: <Register/>},
      {path:"login", element: <Login  logver={getLoggedUser}/>},
      {path:"home", element: <ProuductedRoute><Home /></ProuductedRoute>},
      {path:"all", element: <ProuductedRoute><All /></ProuductedRoute>},
      {path:"pc", element: <ProuductedRoute><Pc/></ProuductedRoute>},
      {path:"sort", element:<ProuductedRoute> <Sort /></ProuductedRoute> ,children:[
        {path: ":sort"}
      ]},
      {path:"browser", element:<ProuductedRoute> <Browser/></ProuductedRoute>},
      {path:"details", element:<ProuductedRoute> <Details/> </ProuductedRoute>,children:[
        {path: ":id"}
      ]},
      {path:"category", element:<ProuductedRoute> <Categories/> </ProuductedRoute>,children:[
        {path: ":path"}
      ]},







    ]},
    {path: "*" , element: <Error />}
  
  ])
  
  
  return (
      <>
<Offline>
  <div className='offline p-3 bg-warning border border-white border-3 text-white position-fixed bottom-50'>
    <h2>Opps your internet connecation has been lost </h2>
  </div>
</Offline>
          <RouterProvider router={router} />
      </>
  )
}

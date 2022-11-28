import React, { useState } from 'react'
import './Register.css'
import {Link} from 'react-router-dom'
import Img from './../Img/Img';
import Jio from 'joi';
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

  const [user, setUser] = useState({
    first_name:"",
    last_name:"",
    email:"",
    age:0,
    password:"",
  })


  const [joiMassage, setJoiMassage] = useState(null)
  const [apiMassage, setApiMassage] = useState("")
  const [isloading, setisloading] = useState(false)

  const navigate = useNavigate()




  //get value from input
  function getUser(e){
    setJoiMassage(null)
    let inputValue = e.target.value;
    let property = e.target.id;
    let newUser = {...user}
    newUser[property] = inputValue;
    setUser(newUser)
  }



  //submit form

  function submitForm(e){
    e.preventDefault()
    setisloading(true)
 //validtion

 const schema= Jio.object(
  {    
    first_name:Joi.string().alphanum().min(2).max(15).required(),
    last_name:Joi.string().alphanum().min(2).max(15).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: Joi.number().min(15).max(80).required() ,   
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}
 )

 let responsJoi = schema.validate(user , {abortEarly : false})

 


  if(responsJoi.error == undefined){
    sendUser()
  }
  else{
    setisloading(false)
    setJoiMassage(responsJoi.error.details)


  }




  }



 //fetch Api
  async function sendUser(){
    const {data}= await axios.post("https://route-egypt-api.herokuapp.com/signup" , user);


    setisloading(false)


    if(data.message == 'success'){
      navigate("/login")
    }else{
      setApiMassage(data.message)
    }
  }


  function getErrorMassegEromJoi(label)
{
  if(joiMassage != null){

    for (let i = 0; i < joiMassage.length; i++) {

      if(joiMassage[i].context.label == label)
      {
        return joiMassage[i].message
      }

    }

  }

  
  return ""
}




  return (
    <>
            <div className="register py-5">
            <Helmet>

                <title>Game Over</title>
            </Helmet>
        <div className="container py-5">

          <div className="row py-5">

            <div className="col-lg-6">

                <Img />

            </div>
            <div className="col-lg-6 reg-bg py-5">
              <div className="reg text-center">
                  <h2 className='text-white-50 mb-5'>Create My Account!</h2>
                  <form onSubmit={submitForm}>
                    <div className="row ">
                      <div className="col-md-6">
                      <input onChange={getUser} type="text" id='first_name'  placeholder='First Name' className='form-control  text-white bg-dark border-0 mb-3' />

                      {getErrorMassegEromJoi("first_name")?<div  className="alert alert-warning p-1 text-dark" role="alert">{getErrorMassegEromJoi("first_name")}</div>: "" }

                      </div>

                      <div className="col-md-6">
                      <input onChange={getUser} type="text" id='last_name' placeholder='First Name' className='form-control  text-white bg-dark border-0 mb-3' />


                      {getErrorMassegEromJoi("last_name")?<div  className="alert alert-warning p-1 text-dark" role="alert">{getErrorMassegEromJoi("last_name")}</div>: "" }

                      </div>
                    </div>

                    <input onChange={getUser} type="email" id='email' placeholder='Email Address' className='form-control  text-white bg-dark border-0 mb-3' />

                      {getErrorMassegEromJoi("email")?<div  className="alert alert-warning p-1 text-dark" role="alert">{getErrorMassegEromJoi("email")}</div>: "" }

                    <input onChange={getUser} type="number" id='age' placeholder='age' className='form-control  text-white bg-dark border-0 mb-3' />
                    {getErrorMassegEromJoi("age")?<div  className="alert alert-warning p-1 text-dark" role="alert">{getErrorMassegEromJoi("age")}</div>: "" }
 
                    <input onChange={getUser} type="password" id='password' placeholder='Passowrd' className='form-control  text-white bg-dark border-0 mb-3' />
                      
                    {getErrorMassegEromJoi("password")?<div  className="alert alert-warning p-1 text-dark" role="alert">check your password is not valid </div>: "" }

                    <button className='btn btn-info w-100'>{isloading==false?"Create Account" : <i class="fa-solid fa-spinner fa-spin"></i>}</button>

                    {apiMassage.length == 0 ?"" : <div  className="alert alert-danger p-1 my-2 text-dark" role="alert">
              {apiMassage}
            </div>} 

                    <p className='text-white-50 my-3 reg-info'>
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                    </p>
                  </form>
              </div>

              <div className="reg-footer text-center pt-3 text-white-50">
              Already a member?
              <Link to="/login" className='text-decoration-none ms-2 text-primary'>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

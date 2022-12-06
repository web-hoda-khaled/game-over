import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Img from './../Img/Img';
import Jio from 'joi';
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Login({logver}) {
  const [isloading, setisloading] = useState(false)

 const [user, setUser] = useState({
  email:"",
  password:"",
})


const [joiMassage, setJoiMassage] = useState(null)
const [apiMassage, setApiMassage] = useState("")
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
  email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
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
  const {data}= await axios.post("https://sticky-note-fe.vercel.app/signin" , user);

  setisloading(false)



  if(data.message == 'success'){
    localStorage.setItem("tkn", data.token)
    logver()
    navigate("/home")

  }else{
    setApiMassage(data.message)
  }
}


function forget(){
 alert("ههه اعمل اكونت جديد")


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

            <div className="col-md-6">

                <Img />

            </div>
            <div className="col-md-6 reg-bg py-5">
              <div className="reg text-center">
                  <h2 className='text-white-50 mb-2'>Log in to GameOver</h2>
                  <img src="./img/logo.png" className='mb-4' alt="img"/>
                  <form onSubmit={submitForm}>

                    <input onChange={getUser} type="email" id='email' placeholder='Email Address' className='form-control text-white bg-dark border-0 mb-3' />
                    {getErrorMassegEromJoi("email")?<div  className="alert alert-warning p-1 text-dark" role="alert">{getErrorMassegEromJoi("email")}</div>: "" }



                    <input onChange={getUser} type="password" id='password' placeholder='Passowrd' className='form-control text-white bg-dark border-0 mb-3' />

                    {getErrorMassegEromJoi("password")?<div  className="alert alert-warning p-1 text-dark" role="alert">check your password is not valid </div>: "" }




                    


                    <button className='btn btn-info w-100 mb-3'>{isloading==false?"Login" : <i class="fa-solid fa-spinner fa-spin"></i>}</button>
                  </form>
                  {apiMassage.length == 0 ?"" : <div  className="alert alert-danger p-1 text-dark" role="alert">
              {apiMassage}
            </div>} 
              </div>
               <div className='text-center pt-3'>
              <Link onClick={forget} className='text-decoration-none  ms-2'>Forgot Password?</Link>

               </div>
               
              <div className="reg-footer text-center pt-1 text-white-50">
              Already a member?
              <Link to="/" className='text-decoration-none ms-2 text-primary'>Create Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

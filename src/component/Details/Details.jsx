import React, {useEffect ,useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Details() {

 const [details, setDetails] = useState(undefined)

 let {id}=useParams()

 useEffect(() => {
  getDetails()
}, [])


 async function getDetails(){
  let {data} = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/game"  ,
  {params:{id :id},
    headers :{
      'X-RapidAPI-Key':  'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'}})
  setDetails(data)
}



  return (
<>
   
{details == undefined? <div className='loading-screen'>
   <div className='vh-100  loading d-flex justify-content-center align-items-center'>
     <div className='loading-icon'>
     <i className="fa-regular fa-circle fa-2x me-4  fa-bounce "></i>
     <i className="fa-solid fa-play fa-2x me-4  fa-bounce "></i>
     <i className="fa-regular fa-square fa-2x me-4 fa-bounce"></i>
     <i className="fa-solid fa-diamond fa-2x me-4 fa-bounce"></i>
   </div>
   </div>
   </div>:

   <div className='vh-100 py-5'>
           <Helmet>
           <link rel="icon" href="./img/logo.png" />
       <title>{details.title} Details</title>
   </Helmet>
       <div className="container py-5 ">
        <div className="row py-3">
         <div className="col-md-4">
          <div className="details-img">
           <img src={details.thumbnail} className='w-100 rounded-2' alt="img" />
           <div className='row my-2'>
             <div className="col-md-3">
                 <a className='w-100 btn  btn-dark ' >free</a>

             </div>

             <div className="col-md-9">
                    <a className='w-100 btn  btn-info text-white' href={details.freetogame_profile_url} target="_blank">Play Now</a>
              </div>
           </div>
          </div>
         </div>

         <div className="col-md-8">
          <div className='text-white-50'>
           <h1 className='mb-3'>{details.title}</h1>
           <h5 className='mb-3'>About {details.title}</h5>
           <p className='mb-4'> {details.description}</p>
           <h5 className='mb-3'>Minimum System Requirements</h5>

            <p><span className='fw-bold me-3 '>graphics :</span>{details.minimum_system_requirements?.graphics}</p>
            <p><span className='fw-bold me-3 '>memory :</span>{details.minimum_system_requirements?.memory}</p>
            <p><span className='fw-bold me-3 '>processor :</span>{details.minimum_system_requirements?.processor}</p>
            
            <p><span className='fw-bold me-3 '>storage :</span>{details.minimum_system_requirements?.storage}</p>
           <h5 className='mb-3'>{details.title} Screenshots</h5>
                 
           <div id="carouselExampleDark" className="carousel slide" data-bs-ride="true" >
           <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="300">
      <img src={details.screenshots[0]?.image} className="d-block w-100" alt="img"/>
    </div>
    <div className="carousel-item" data-bs-interval="600">
      <img src={details.screenshots[1]?.image} className="d-block w-100" alt="img"/>
    </div>
    <div className="carousel-item" data-bs-interval="900">
      <img src={details.screenshots[2]?.image} className="d-block w-100" alt="img"/>
    </div>
  </div>

</div>
           <h4 className='my-3'>Additional Information</h4>
            <div className="row g-3">


             <div className="col-md-4">
              <div className="">
               <h6>Title</h6>
               <p>{details.title} </p>
              </div>
             </div>


             <div className="col-md-4">
              <div className="">
               <h6>Developer</h6>
               <p>{details.developer} </p>
              </div>
             </div>

             <div className="col-md-4">
              <div className="">
               <h6>Publisher</h6>
               <p>{details.publisher} </p>
              </div>
             </div>







             <div className="col-md-4">
              <div className="">
               <h6>Release Date</h6>
               <p>{details.release_date} </p>
              </div>
             </div>





             <div className="col-md-4">
              <div className="">
               <h6>Genre</h6>
               <p>{details.genre} </p>
              </div>
             </div>




             <div className="col-md-4">
              <div className="">
               <h6>Platform</h6>
               <p> {details.platform} </p>
              </div>
             </div>



            </div>


          </div>
         </div>

        </div>
       </div>
    </div>}

    

</>
  
  )
}

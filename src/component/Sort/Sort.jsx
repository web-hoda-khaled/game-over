import React, {useEffect ,useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Sort() {
  const [IdError, setIdError] = useState("");
  const [sortBy, setSortBy] = useState(undefined);
  let [all, setAll] = useState(20)

  let {sort}=useParams()


    

  //fetch api
  async function getGames() {
    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
      params: { "sort-by": sort},
      headers: {
        'X-RapidAPI-Key': 'fc42eedff7msh1176cf883aee197p199b36jsn12e2a3062d67',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }).catch(error=>
      {
        setIdError(error.response.status)
      })
    console.log(data)
    setSortBy(data)
    
  }

  useEffect(() => {
    getGames()
    }, [sort])
    

  function getMero(){
    
    setAll(all + 20)
    getGames()
    

  }


  return (
    <>
   {sortBy == undefined? <div className='loading-screen'>
<div className='vh-100  loading d-flex justify-content-center align-items-center'>
  <div className='loading-icon'>
  <i className="fa-regular fa-circle fa-2x me-4  fa-bounce "></i>
  <i className="fa-solid fa-play fa-2x me-4  fa-bounce "></i>
  <i className="fa-regular fa-square fa-2x me-4 fa-bounce"></i>
  <i className="fa-solid fa-diamond fa-2x me-4 fa-bounce"></i>
</div>
</div>
</div>: <div className="all py-5">
     <div className="container py-5">
      <div className="row pt-2 align-items-center">

      
      <Helmet>
      <link rel="icon" href="./img/logo.png" />
                <title>sort by : {sort}</title>
            </Helmet>

       {sortBy.slice(0,all).map( (elem , index) =>   <div key={index} className="col-lg-3 col-md-6  elemnt-facous">
              <div className="shadow-lg  mb-5  rounded">
                  <Link to={"/details/"+ elem.id}>
                  <div className="home-inner">
                    <figure>
                      <img src={elem.thumbnail} className='w-100' alt="img" />
                    </figure>
                    
                    <div className="home-col d-flex justify-content-between align-items-center px-2">
                    <h5 className='text-white-50 text-capitalize'>{elem.title.substring(1,20)}</h5>
                    <button className='btn btn-info text-white'>free</button>
                    </div>
                    <p className='text-white-50 mt-1 px-2 text-capitalize'>{elem.short_description.substring(1,30)} <span>.....</span> </p> 

                    <div className="elemet-icon pb-3 px-3 d-flex justify-content-between align-items-center">
                      <div className="plus-icon">
                      <i className="fa-solid fa-square-plus text-white-50"></i>
                      </div>
                      <div className="desc-icon">
                       <span className='bg-secondary  px-2 py-0 rounded-pill me-3'>{elem.genre}</span>

                       {elem.platform == "PC (Windows)"? <i className="fa-brands fa-windows text-white-50"></i> : <i className="fa-solid fa-window-maximize text-white-50"></i>}
                      </div>
                    </div>
                </div>  
                  </Link>
              </div>
              </div>
  )}
        <div className="col-md-3">
            
         
           
           <div className="all-inner text-center ">
            <button onClick={getMero} className='btn btn-outline-info'>More Games</button>
          </div>
          

           
        </div>

      </div>

     </div>
    </div>} 
    </>
  )
}

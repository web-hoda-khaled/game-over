import React, {useEffect ,useState } from 'react'
import axios from 'axios';
import './Home.css'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Home() {

  const [game, setGame] = useState(undefined)
  



useEffect(() => {

  getRecomdation()

}, [])



  //fetch api
  async function getRecomdation(){
    let {data} = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games?rapidapi-key=b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68")
    setGame(data.slice(0 , 3))
    
  }






  return (
    <>
      {game == undefined? <div className='loading-screen'>
<div className='vh-100  loading d-flex justify-content-center align-items-center'>
  <div className='loading-icon'>
  <i className="fa-regular fa-circle fa-2x me-4  fa-bounce "></i>
  <i className="fa-solid fa-play fa-2x me-4  fa-bounce "></i>
  <i className="fa-regular fa-square fa-2x me-4 fa-bounce"></i>
  <i className="fa-solid fa-diamond fa-2x me-4 fa-bounce"></i>
</div>
</div>
</div> :       <header className='home-header'>
<Helmet>
                <title>Game Over</title>
            </Helmet>

        <div className="home-img d-flex justify-content-center align-items-center">
          <div className="home-content text-center">
              <h1 className='text-white-50 mb-3'>Find & track the best <span className='text-primary '>free-to-play</span> games!</h1>
              <p className='text-white-50'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
              <Link to="/all" className='btn btn-outline-dark text-white-50 p-2 mt-1'>Browse Games</Link>
          </div>
        </div>


        <div className="home-recomendition py-5">
          <div className="container">
            <h2 className='text-white-50'> <i className="fa-solid fa-robot"></i> Personalized Recommendations</h2>

            <div className="row mt-5">


                  {game.map( (elem , index) =>   <div key={index} className="col-md-4 elemnt-facous">
              <div className="shadow-lg  mb-5  rounded">
                  <Link to={"/details/"+ elem.id}>

                  <div className="home-inner">
                    <figure>
                      <img src={elem.thumbnail} className='w-100' alt="img" />
                    </figure>
                    
                    <div className="home-col d-flex justify-content-between align-items-center p-3">
                    <h3 className='text-white-50'>{elem.title}</h3>
                    <button className='btn btn-info fw-bold text-white'>free</button>
                    </div>
                </div>
                  </Link>
              </div>
              </div>
  )}

            </div>
          </div>
        </div>
      </header>}
    </>
  )
}

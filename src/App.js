import { useEffect, useState } from 'react';
import './App.css';

const apiKey = "1abb3e68d878be1155d781ce812f80a8"
const baseUrl = "https://api.themoviedb.org/3"
const src= "https://vidsrc.io/embed/"

const App = () => {

  const [shows,setShows] = useState([])
  const [select,setSelect] = useState("")
  
  const getShows = async() => {
    try {

      await fetch(`https://proxy.cors.sh/https://api.themoviedb.org/3/discover/${select ? select: "movie"}?api_key=1abb3e68d878be1155d781ce812f80a8`,{
        headers: {
          'x-cors-api-key': 'temp_6024f5608c16e2b812cc9451542813cb'
          }
      })
      .then(res => res.json())
      .then(json => setShows(json.results))
      
    } catch (er) {
      console.error(er)
    }
  }

  useEffect(()=>{
    getShows()
  },[select])

  return (
<div className="App">
  <h1>isg32's vidsrc</h1>
  <i><h4>*it is recommended to use an adblocker*</h4></i>
  <hr/>
  <button className='selbutton' onClick={() => setSelect("movie")}>Movies</button>
  <button className='selbutton' onClick={() => setSelect("tv")}>TV-Shows</button>
  <div className="movies-container">
    {shows.map((data) => (
      <div className='moviecards' key={data.id}>
        <img className='posters' src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
        <div className='card-headline'>
        <p className='titles'>Title: <span>{data?.original_name}{data?.original_title}</span></p>
        <a href={src + data.id}>
          <div className='playbutton'>
            <p>Play</p>
          </div>
        </a>
        </div>
        <p className='titles'>Overview: <span>{data?.overview}</span></p>
      </div>
    ))}
  </div>
</div>

  );
}

export default App;

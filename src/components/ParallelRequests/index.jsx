import './ParallelRequests.scss'
import {useState, useEffect} from 'react';


const getAllEpisodes = async () => {
  const response = await fetch('https://rickandmortyapi.com/api/episode');
  const data = await response.json();
  return data.results; 
}

const getCharacterInfo = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data; 
}

const getData = async () => {
  const episodes = await getAllEpisodes();

  const characters = episodes.reduce((acc, item) => {
    return [...acc, ...item.characters.slice(0, 10)]
  }, [])

  const characterPromise = characters.map((url) => {
    return getCharacterInfo(url);
  });
  
  const result = await Promise.all(characterPromise);

  const data = episodes.map((episode) => {
    return {
      id: episode.id,
      title: `${episode.name} - ${episode.episode}`,
      airDate: episode.air_date,
      characters: episode.characters.slice(0, 10).map((url) => {
      return result.find((item) => item.url === url)
      })
    }
  })
  return data
}

const ParallelRequest = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData().then((data) => {
      setData(data)
    })
  }, [])
  

  return (
    <>
      <div className="logo">
        <img src="/Rick_and_Morty.svg.png" alt="logo" />
      </div>
      <div className="cards-container">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-title">{item.title}</div>
            <div className="card-date">{`Air Date: ${item.airDate}`}</div>
            <div className="characters-title">Characters</div>
            <div className="characters-container">
              {item.characters.map((character) => (
                <div className="character" key={character.id}>
                    {`- ${character.name}  (${character.species})`}
                </div>
              ))}
            </div>
          </div>
        )
        )}
      </div>
    </>
  )
}

export default ParallelRequest
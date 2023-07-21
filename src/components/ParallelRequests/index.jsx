import {useState, useEffect} from 'react';
import { getEpisodesWithCharacters } from './utils';

const fetchEpisodes = async () => {
  const response = await fetch('https://rickandmortyapi.com/api/episode');
  return response.json(); 
}

const fetchCharactersList = async () => {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  return response.json(); 
}


const ParallelRequest = () => {

  const [episodesAndCharacters, setEpisodesAndCharacters] = useState([
    {

    }
  ])

  useEffect(() => {
    const fetchAll = async () => {
      const episodesPromise = fetchEpisodes()
      const charactersListPromise = fetchCharactersList()

      const [episodesData, charactersListData] = await Promise.all([episodesPromise, charactersListPromise])
      const data = getEpisodesWithCharacters(episodesData.results, charactersListData.results);
      setEpisodesAndCharacters(data);

    }
    fetchAll()
  }, [])

  return (
    <div>
      <h1>Episodes</h1>
      
      {episodesAndCharacters.map((episode) => (
        <div  key={episode.id}>
          <div>{`${episode.id}. ${episode.name} - ${episode.episode}`}</div>
          <div>{`Fecha al aire: ${episode.air_date}`}</div>
          
        </div>
      )
      )}

    </div>
  )
}

export default ParallelRequest

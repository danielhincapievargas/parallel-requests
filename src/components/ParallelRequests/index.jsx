import './ParallelRequests.scss'
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
        id: "",
        name: "",
        air_date: "",
        episode: "",
        characters: {},
        url: "",
        created: "",
        charactersList: [
          {
            id: "",
            name: "",
            status: "",
            species: "",
            type: "",
            gender: "",
            origin: {},
            location: {},
            image: "",
            episode: [],
            url: "",
            created: ""
          }]  
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
    <>
      <div className="logo">
        <img src="/Rick_and_Morty.svg.png" alt="logo" />
      </div>
      <div className="cards-container">
        {episodesAndCharacters.map((episode) => (
          <div className="card" key={episode.id}>
            <div className="card-title">{`${episode.id}. ${episode.name} - ${episode.episode}`}</div>
            <div className="card-date">{`Air Date: ${episode.air_date}`}</div>
            <div className="characters-title">Characters</div>
            <div className="characters-container">
              {episode.charactersList.map((character) => (
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

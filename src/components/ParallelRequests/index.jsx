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

  const [charactersList, setCharactersList] = useState([
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
    }
  ])
  //console.log(charactersList[0].name);
  
  const [episodes, setEpisodes] = useState([
    {
      air_date: "",
      characters: {},
      episode: "",
      id: "",
      name: "",
      url: "",
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

      setEpisodes(episodesData.results)
      setCharactersList(charactersListData.results)
    }
    fetchAll()
  }, [])


  const twentyEpisodes = episodes.slice(0, 20)

  const episodesAndCharacters = getEpisodesWithCharacters(twentyEpisodes, charactersList);
  //console.log(episodesAndCharacters);

  console.log(episodesAndCharacters);
  //console.log(episodes.charactersList);

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

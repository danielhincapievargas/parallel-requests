import {useState, useEffect} from 'react';

const SimpleRequest = () => {

  const [episodes, setEpisodes] = useState([
    {
      air_date: "",
      characters: {},
      episode: "",
      id: "",
      name: "",
      url: ""
    }
  ])

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/episode');
      const data = await response.json();
      setEpisodes(data.results)
      
    }
    fetchEpisodes()
  }, [])

  const tenEpisodes = episodes.slice(0, 10)

  return (
    <div>
      <h1>Episodes</h1>
      
      {tenEpisodes.map((episode) => (
        <div  key={episode.id}>
          <div>{`${episode.id}. ${episode.name} - ${episode.episode}`}</div>
          <div>{`Fecha al aire: ${episode.air_date}`}</div>
        </div>

      )
      )}
    </div>
  )
}

export default SimpleRequest
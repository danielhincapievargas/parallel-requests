export function getEpisodesWithCharacters(twentyEpisodes = [], charactersList = []) {
  const episodesWithCharacters = twentyEpisodes.map(episode => {
  const charactersForEpisode = charactersList.filter(characterInList => characterInList.episode.includes(episode.url))
    return {
      ...episode,
      charactersList: charactersForEpisode
    }
  })

  return episodesWithCharacters
}

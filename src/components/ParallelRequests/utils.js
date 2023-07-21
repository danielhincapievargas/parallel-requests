export function getEpisodesWithCharacters(episodesList = [], charactersList = []) {
  const episodesWithCharacters = episodesList.map(episode => {
  const charactersForEpisode = charactersList.filter(characterInList => characterInList.episode.includes(episode.url))
    return {
      ...episode,
      charactersList: charactersForEpisode
    }
  })

  return episodesWithCharacters
}

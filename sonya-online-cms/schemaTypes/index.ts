import blockContent from './objects/blockContent'
import crewMember from './samples/crewMember'
import castMember from './samples/castMember'
import movie from './samples/movie'
import person from './samples/person'
import screening from './samples/screening'
import plotSummary from './samples/plotSummary'
import plotSummaries from './samples/plotSummaries'
import about from './documents/about'
import technology from './objects/technology'
import work from './documents/work'

export const schemaTypes = [
  // Document types
  about,
  work,
  movie,
  person,
  screening,

  // Other types
  blockContent,
  plotSummary,
  plotSummaries,
  castMember,
  crewMember,
  technology,
]

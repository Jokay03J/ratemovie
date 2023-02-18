import { DateTime } from 'luxon'

type Movie = {
  id?: number
  createdAt: DateTime
  title: string
  author: string
  poster: Blob
}

export default Movie

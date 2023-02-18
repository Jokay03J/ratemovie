import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { schema } from '@ioc:Adonis/Core/Validator'
import Movie from '../../app/Models/Movie'
import { mean } from '../utils/mean'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

//get movies
Route.get('/movies', async ({ request }) => {
  const page = request.input('page', 1)
  const limit = request.input('limit', 10)
  return Database.from('movie').paginate(page, limit)
})

//create movie
Route.post('/movie', async ({ request }) => {
  const payloadSchema = schema.create({
    title: schema.string(),
    author: schema.string(),
    createdAt: schema.date(),
    poster: schema.file.optional({ extnames: ['png', 'jpg', 'webp'], size: '10mb' }),
  })

  await request.validate({ schema: payloadSchema })
  const { title, author, createdAt } = request.body()
  const posterRequest = request.file('poster')
  let poster

  if (posterRequest) {
    await posterRequest.move(Application.tmpPath('uploads'))

    poster = fs.readFileSync(`${Application.tmpPath('uploads')}/${posterRequest.fileName}`)
  }

  const movie: Movie = {
    title,
    author,
    createdAt,
    poster,
  }

  await Database.table('movie').insert(movie)

  return movie
})

//delete movie with his id
Route.delete('/movie/:id', async ({ request, response }) => {
  const { id } = request.params()

  const result = await Database.rawQuery('DELETE FROM movie m WHERE m.id = ?', [id])
  if (result[0].affectedRows === 0)
    return response.notFound({ error: true, message: 'Movie not found' })

  return response.send(id)
})

//get movie with his id
Route.get('/movie/:id', async ({ request, response }) => {
  const { id } = request.params()

  const result = await Database.rawQuery('SELECT * FROM movie m WHERE m.id = ?', [id])

  if (!result[0][0]) {
    return response.notFound({ error: true, message: 'movie not found' })
  }

  const note = await Database.rawQuery('SELECT * FROM note n WHERE n.movieId = ?', [id])

  return { ...result[0][0], note: mean(note[0]) ? mean(note[0]) : null }
})

//get mean from all notes on a movie
Route.get('/note/mean/:id', async ({ request, response }) => {
  const { id } = request.params()

  const result = await Database.rawQuery('SELECT * FROM note n WHERE n.movieId = ?', [id])

  if (!result[0][0]) {
    return response.notFound({ error: true, message: 'movie notes not found' })
  }

  return mean(result[0])
})

//get note with his id
Route.get('/note/:id', async ({ request, response }) => {
  const { id } = request.params()

  const result = await Database.rawQuery('SELECT * FROM note n WHERE  n.id = ?', [id])

  if (!result[0]) {
    return response.notFound({ error: true, message: 'note not found' })
  }

  return result[0][0]
})

//create note with movie id
Route.post('/note/:id', async ({ request, response, logger }) => {
  const { id } = request.params()

  const payloadSchema = schema.create({ note: schema.number() })
  await request.validate({ schema: payloadSchema })

  const { note } = request.body()

  await Database.rawQuery('INSERT INTO note(movieId, note) VALUES (?, ?)', [id, note]).catch(
    (err) => {
      switch (err.code) {
        case 'ER_NO_REFERENCED_ROW_2':
          return response.notFound({ error: true, message: 'movie not found' })

        default:
          logger.fatal(err)
          return response.internalServerError(err)
      }
    }
  )

  return { movieId: id, note }
})

//delete note with his id
Route.delete('/note/:id', async ({ request, response }) => {
  const { id } = request.params()

  const result = await Database.rawQuery('DELETE FROM note n WHERE n.id = ?', [id])

  if (result[0].affectedRows === 0) {
    return response.notFound({ error: true, message: 'movie not found' })
  }

  return id
})

//update note
Route.put('/note/:id', async ({ request }) => {
  const { id } = request.params()
  const payloadSchema = schema.create({
    note: schema.number(),
  })

  await request.validate({ schema: payloadSchema })
  const { note } = request.body()

  const result = await Database.rawQuery('UPDATE note n SET note = ? WHERE n.id = ?', [note, id])
  return result
})

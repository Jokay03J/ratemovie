import { Note } from '../../app/Models/Note'

/**
 * @description return the mean of notes
 * @param notes
 * @returns {number} mean
 */
export function mean(notes: Array<Note>): number {
  let noteResult: number = 0
  for (let index = 0; index < notes.length; index++) {
    const note = notes[index]
    noteResult += note.note
  }

  return noteResult / notes.length
}

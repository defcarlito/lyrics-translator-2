import { Song } from "./song"

/*
Represents if a user has chosen a song yet. 
*/
export type Selection = {
  song: Song | undefined
  hasSelected: boolean
}

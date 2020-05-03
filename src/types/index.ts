/**
 * Beautiful melodies for them ear holes in your head.
 */
export interface Song {
	id: number
	artist: string
	audioFile: string
	artwork?: string
	title: string
	album: string
}

export interface User {
	firstName: string
	lastName: string
	favoriteSong?: Song
}

import React, { useState } from 'react'
import { Song } from '../types'
import axios from 'axios'

// children
import TunesSearchForm from '../components/tunes/TunesSearchForm'
import TunesList from '../components/tunes/TunesList'

// data types
interface SongFromITunes {
	trackId: number
	artistName: string
	previewUrl: string
	artworkUrl100?: string
	trackName: string
	collectionName: string
	kind?: string
}

// component
const Tunes: React.FC = () => {
	// state
	const [songs, setSongs] = useState([])
	const [searching, setSearching] = useState(false)


	// callback
	const handleSearch = (query: string) => {
		setSearching(true)
		setSongs([]);
		axios
			.get(
				`https://itunes.apple.com/search
				?term=${encodeURI(query)}
				&entity=musicTrack
				&limit=5`
			)
			.then(response => {
				let iTunesSongs = response.data.results
					.filter((song: SongFromITunes) => song.kind === 'song')
					.map((song: SongFromITunes) => extractData(song))
				setTimeout(() => {
					setSearching(false);
					setSongs(iTunesSongs);
				}, 500)
			})
	}

	const extractData = ({
		trackId: id,
		artistName: artist,
		previewUrl: audioFile,
		artworkUrl100: artwork,
		trackName: title,
		collectionName: album
	}: SongFromITunes) => {
		return { id, artist, audioFile, artwork, title, album } as Song
	}

	// template
	return (
		<article className="tunes">
			<h1>{searching ? 'Searching...' : 'iTunes'}</h1>
			<TunesSearchForm onSearch={handleSearch} />
			<TunesList songs={songs} />
		</article>
	)
}

export default Tunes

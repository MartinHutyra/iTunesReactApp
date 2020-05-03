import React from 'react'
import { Song } from '../../types'
import { truncate } from 'lodash-es'

// styles
import './TunesSong.scss'

// props
interface Props {
	song: Song
}

// component
const TunesSong: React.FC<Props> = props => {
	const { song } = props

	// make it pretty
	const songify = (song: Song): string => {
		const newTitle = song.artist + ' - ' + song.title
		return shorten(newTitle, 100)
	}

	// make it short
	const shorten = (str: string, len = 55): string => {
		return truncate(str, { length: len })
	}

	// template
	return (
		<article className="song">
			<div className="inside">
				<h2>{songify(song)}</h2>

				<div className="player">
					{song.artwork && (
						<img src={song.artwork} alt="album art" />
					)}

					<audio controls src={song.audioFile} />
				</div>
			</div>

			<footer className="meta">{shorten(song.album)}</footer>
		</article>
	)
}

export default TunesSong

/*
// make it pretty
const songify = useMemo(
	() => (song: Song): string => {
		const newTitle = song.artist + ' - ' + song.title
		return shorten(newTitle, 100)
	},
	[song.artist, song.title]
)

// side effect
useEffect(() => {
	fetch('https://api.myjson.com/bins/zg7ze')
		.then(res => res.json())
		.then(console.log)
}, [])
*/

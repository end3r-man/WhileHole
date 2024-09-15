import { MediaSession } from "@jofr/capacitor-media-session"

export default function usePlayer(song) {

    const source = useState('song', () => ({
        isPlaying: false,
        audio: null,
        CurrentArtist: null,
        CurrentAlbum: null,
        CurrentTrack: null,
        Playlist: null,
        TrackImage: null,
        TrackUrl: null
    }))

    function loadSong(params) {

        source.value.CurrentAlbum = params.album.name
        source.value.CurrentArtist = params.artists.all[0].name
        source.value.CurrentTrack = params.name
        source.value.TrackImage = params.image[2].url
        source.value.TrackUrl = params.downloadUrl[4].url

        if (source.value.isPlaying && source.value.audio.src != '') {
            source.value.audio.pause()
            source.value.isPlaying = false
            source.value.audio.src = ''
        }

        source.value.audio = new Audio()
        source.value.audio.src = source.value.TrackUrl

        setTimeout(() => {
            source.value.isPlaying = true
            source.value.audio.play()
        }, 200)

        // HandleSession()
    }

    function playorpause() {
        if (audio.value.isPlaying && !audio.value.audio.paused) {
            audio.value.audio.pause()
            audio.value.isPlaying = false
        } else {
            audio.value.audio.play()
            audio.value.isPlaying = true
        }
    }

    function nextSong(index) {
        if (index === audio.value.Playlist.length) {
            let index = 0
            loadSong(index, audio.value.Playlist)
        } else {
            let current = index + 1
            loadSong(current, audio.value.Playlist)
        }
    }

    return {
        source,
        loadSong,
        nextSong,
        playorpause,
    }
}
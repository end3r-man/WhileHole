import { MediaSession } from "@jofr/capacitor-media-session"

export default function usePlayer(song) {

    const audio = useState('song', () => ({
        isPlaying: false,
        audio: null,
        CurrentArtist: null,
        CurrentAlbum: null,
        CurrentTrack: null,
        Playlist: null,
        TrackImage: null,
        TractName: null,
        shuffle: false,
        nextSong: null
    }))

    const NextTrack = () => {
        if (audio.value.shuffle) {
            audio.value.nextSong = Math.floor(Math.random() * audio.value.Playlist.length)
        } else {
            audio.value.nextSong = audio.value.CurrentTrack + 1
        }
    }

    function loadSong(index, playlist) {
        audio.value.Playlist = playlist
        audio.value.CurrentTrack = index
        audio.value.CurrentArtist = playlist[index].artists.all[0].name
        audio.value.CurrentAlbum = playlist[index].album.name
        audio.value.TractName = playlist[index].name
        audio.value.TrackImage = playlist[index].image[2].url

        if (audio.value.isPlaying && audio.value.audio.src != '') {
            audio.value.audio.pause()
            audio.value.isPlaying = false
            audio.value.audio.src = ''
        }

        audio.value.audio = new Audio()
        audio.value.audio.src = playlist[index].downloadUrl[3].url

        setTimeout(() => {
            audio.value.isPlaying = true
            audio.value.audio.play()
        }, 200)

        NextTrack()

        HandleSession()
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

        let cindex = index + 1

        if (index === audio.value.Playlist.length) {
            let index = 0
            loadSong(index, audio.value.Playlist)
        }else {
            loadSong(audio.value.nextSong, audio.value.Playlist)
        }
    }

    function HandleSession() {
        let ses = MediaSession.setMetadata({
            title: audio.value.TractName,
            album: audio.value.CurrentAlbum,
            artist: audio.value.CurrentArtist,
            artwork: [{src: audio.value.TrackImage, type: 'image/jpg', sizes: '512x512'}]
        })

        MediaSession.setPlaybackState({
            playbackState: true
        })

        MediaSession.setActionHandler({action: 'pause'}, () => {
            audio.value.audio.pause()
        })

        MediaSession.setActionHandler({action: 'play'}, () => {
            audio.value.audio.play()
        })
    }

    // async function  UpdateMediaSession(params) {

    //     await MediaSession.setPositionState({
    //         duration: params.duration,
    //         playbackRate: params.rate,
    //         position: params.position
    //     })
        
    // }

    return {
        audio,
        loadSong,
        nextSong,
        playorpause,
        NextTrack,
    }
}
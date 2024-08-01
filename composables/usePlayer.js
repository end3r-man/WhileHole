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
    }))

    function loadSong(index, playlist) {
        audio.value.Playlist = playlist
        audio.value.CurrentTrack = index
        audio.value.CurrentArtist = playlist[index].artists.all[0].name
        audio.value.CurrentAlbum = playlist[index].album.id
        audio.value.TractName = playlist[index].album.name
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
        }else {
            let current = index + 1
            loadSong(current, audio.value.Playlist)
        }
    }

    return {
        audio,
        loadSong,
        nextSong,
        playorpause,
    }
}
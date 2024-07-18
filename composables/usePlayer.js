export default function usePlayer(song) {

    const audio = useState('song', () => ({
        isPlaying: false,
        audio: null,
        currentArtist: null,
        currentTract: null,
        trackImage: null,
        tractName: null
    }))

    function loadSong(song) {
        audio.value.currentArtist = song.artists.all[0].name
        audio.value.currentTract = song.album.id
        audio.value.tractName = song.album.name
        audio.value.trackImage = song.image[2].url

        if (audio.value.isPlaying && audio.value.audio.src != '') {
            audio.value.audio.pause()
            audio.value.isPlaying = false
            audio.value.audio.src = ''
        }

        audio.value.audio = new Audio()
        audio.value.audio.src = song.downloadUrl[3].url

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

    return {
        audio,
        loadSong,
        playorpause
    }
}
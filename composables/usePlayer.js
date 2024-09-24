import { MediaSession } from "@jofr/capacitor-media-session";
import { CapacitorMusicControls } from "capacitor-music-controls-plugin";

export default function usePlayer() {
  const store = useState(() => ({
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null,
    currentAlbum: null,
    trackImage: null,
    trackSource: null,
    trackId: null,
    playList: {
      id: null,
      tracks: [],
    },
  }));

  const setSong = (params) => {
    store.value.currentArtist = params.artists.all[0].name;
    store.value.currentTrack = params.name;
    store.value.currentAlbum = params.album.name;
    store.value.trackSource = params.downloadUrl[3]?.url;
    store.value.trackImage = params.image[2]?.url;
    store.value.trackId = params.id
    playSong();
  };

  const setPlayList = (params, id) => {
    store.value.playList.id = params.id;
    store.value.playList.currentId = id;
    store.value.playList.tracks = params.songs || [];
  };

  const playSong = () => {
    if (store.value.isPlaying) {
      store.value.audio.pause();
      store.value.isPlaying = false;
      store.value.audio = null;
    }

    store.value.audio = new Audio(store.value.trackSource);

    store.value.audio.play().then(async () => {
      store.value.isPlaying = true;
      await mediaSession();
    }).catch((error) => {
      store.value.isPlaying = false;
    });

    store.value.audio.onended = () => {
      store.value.isPlaying = false;
    };
  };

  const playOrPause = async () => {
    if (store.value.isPlaying) {
      store.value.audio.pause();
      await MediaSession.setPlaybackState({
        playbackState: "paused",
      });
    } else {
      store.value.audio.play();
      await MediaSession.setPlaybackState({
        playbackState: "playing",
      });
    }
    store.value.isPlaying = !store.value.isPlaying;
  };

  const mediaSession = async () => {
    await MediaSession.setMetadata({
      album: store.value.currentAlbum,
      title: store.value.currentTrack,
      artist: store.value.currentArtist,
      artwork: [
        {
          src: store.value.trackImage,
          sizes: "512x512",
          type: "image/jpg",
        },
      ],
    });

    await MediaSession.setPlaybackState({
      playbackState: "playing",
    });

    await MediaSession.setPositionState({
      playbackRate: 1,
      duration: store.value.audio.duration,
      position: 0,
    });
  };

  return {
    store,
    setSong,
    setPlayList,
    playOrPause,
  };
}

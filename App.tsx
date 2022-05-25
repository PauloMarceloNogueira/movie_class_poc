import * as React from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import VideoList from "./Components/VideoList";
import videoData from "./movies_mock.json";
import { Dialog } from "./Components/Dialog";
import { VideoControllers } from "./Components/VideoControllers";
export default function App() {
  const video: any = React.useRef(null);
  const [status, setStatus]: any = React.useState({});
  const [showDialog, setShowDialog] = React.useState(false);
  const [currentMovie, setCurrentMovie] = React.useState("");
  const [showList, setShowList] = React.useState(false);

  React.useEffect(() => {
    video.current.dismissFullscreenPlayer();
    setShowDialog(true);
  }, [status.didJustFinish]);

  React.useEffect(() => {
    setCurrentMovie(videoData.data[0].sources[0]);
    () => {
      setShowList(false);
    };
  }, []);

  const handleMovie = (movie: string) => {
    setCurrentMovie(movie);
    setShowList(false);
  };

  const nextMovie = () => {
    const currentIndex = videoData.data.findIndex(
      (movie) => movie.sources[0] === currentMovie
    );
    setCurrentMovie(videoData.data[currentIndex + 1].sources[0]);
  };

  return (
    <View style={styles.container}>
      {showDialog && <Dialog close={setShowDialog} nextMovie={nextMovie} />}
      <Video
        onResponderTerminate={() => {
          console.log("TERMINOU");
        }}
        posterStyle={{ width: "100%", height: "100%" }}
        ref={video}
        style={styles.video}
        source={{
          uri: currentMovie,
        }}
        isLooping={false}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        {/* <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        /> */}
        <VideoControllers
          status={status}
          video={video}
          handle={setCurrentMovie}
          currentMovieIndex={videoData.data.findIndex(
            (movie) => movie.sources[0] === currentMovie
          )}
        />
      </View>
      <TouchableOpacity onPress={() => setShowList(!showList)}>
        <View style={{ paddingTop: 16 }}>
          {!showList ? (
            <Text>Ver Playlist</Text>
          ) : (
            <Text>Ocultar playlist</Text>
          )}
        </View>
      </TouchableOpacity>
      {showList && (
        <VideoList handleMovie={handleMovie} current={currentMovie} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    width: "100%",
    height: "100%",
  },
  video: {
    alignSelf: "center",
    width: 500,
    height: 500,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

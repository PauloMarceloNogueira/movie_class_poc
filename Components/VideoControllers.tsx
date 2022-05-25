import { Button, Text, View } from "react-native";
import movies from "../movies_mock.json";
export const VideoControllers: React.FC<{ video: any; status: any, handle: any, currentMovieIndex: number }> = ({
  video,
  status,
  handle,
  currentMovieIndex
}) => {
  return (
    <View style={{flex: 1,  width: "100%", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
        <Button
        title={"Anterior"}
        disabled={currentMovieIndex === 0}
        onPress={() =>
          handle(movies.data[currentMovieIndex - 1].sources[0])
        }
      />
      <Button
        title={status.isPlaying ? "Pause" : "Play"}
        onPress={() =>
          status.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync()
        }
      />
      <Button
        title={"Próximo"}
        disabled={currentMovieIndex === movies.data.length - 1}
        onPress={() =>
            handle(movies.data[currentMovieIndex + 1].sources[0])
        }
      />
    </View>
  );
};

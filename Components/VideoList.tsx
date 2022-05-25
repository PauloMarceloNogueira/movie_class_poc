import React, { ReactComponentElement } from "react";
import { FlatList, Text, TouchableHighlightBase, TouchableOpacity, View } from "react-native";
import movies from "../movies_mock.json";
const VideoList: React.FC<{handleMovie: any, current: string}> = ({handleMovie, current}) => {
  const limitDescription = (description: string) => {
    return description.substring(0, 90) + "...";
  };
	console.log(current, "CURRENT");
  const ListView = (data: any) => {
    const { item } = data;
		const styleContainer = item.sources[0] === current ? { backgroundColor: "rgba(0,0,0,.2)" } : {backgroundColor: "#FFF"};
    return (
      <TouchableOpacity
        onPress={() => handleMovie(item.sources[0])}
				style={styleContainer}

      >
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingBottom: 16,
          }}
        >
          <View
            style={{
              width: 150,
              height: 100,
              backgroundColor: "green",
              marginRight: 8,
            }}
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item?.title}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {item?.subtitle}
            </Text>
            <Text>{limitDescription(item?.description)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        scrollEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={movies.data}
        renderItem={(item) => <ListView item={item.item} />}
      />
    </View>
  );
}

export default VideoList;
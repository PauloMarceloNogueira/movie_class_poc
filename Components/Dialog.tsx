import React from "react";
import { Button, Text, View } from "react-native";

export const Dialog: React.FC<{ close: any, nextMovie: any }> = ({ close, nextMovie }) => {
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        zIndex: 999,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.7)",
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          width: 300,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Você gostou do vídeo?
        </Text>
        <Button
          title={"Sim"}
          onPress={() => {
            nextMovie()
            close(false);
          }}
        />
      </View>
    </View>
  );
};

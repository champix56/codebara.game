import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ICard } from "../../interfaces/card";

type Props = {
  card: ICard;
};

const CardViewer2D = ({ card }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: card.fileloc + "back.png" }} style={styles.image} />
      <Image
        source={{ uri: card.fileloc + "front.png" }}
        style={styles.image}
      />
    </View>
  );
};

export default CardViewer2D;

const styles = StyleSheet.create({
  container: {
    height: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical:30,
  },
  image: {
    height: 253,
    width: 145,
  },
});

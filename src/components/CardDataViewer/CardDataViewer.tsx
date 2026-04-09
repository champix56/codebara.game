import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { ICard } from "../../interfaces/card";

type Props = {
  card: ICard;
  onNameUpdate: (name: string) => void;
};

const CardDataViewer: React.FC<Props> = ({ card, onNameUpdate }: Props) => {
  const [name, setname] = useState(card.name);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text>mettre a jour le Nom :</Text>
          <View style={styles.hContainer}>
            <TextInput
              style={styles.wInput}
              value={name}
              onChangeText={(t) => setname(t)}
            ></TextInput>
            <Button
              title="Maj"
              onPress={() => {
                onNameUpdate(name);
              }}
            ></Button>
          </View>
          <Text style={[styles.title,{textAlign:'center', color:'#FFF'}]}>{name}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>❤️ Health:</Text>
            <Text>{card.health}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>⚔️ Attack:</Text>
            <Text>{card.attack}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>💥 Power:</Text>
            <Text>{card.cardpower}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>⭐ Rarity:</Text>
            <Text>{card.rarity}</Text>
          </View>

          <Text style={styles.subtitle}>Special Abilities</Text>

          <FlatList
            data={card.specials}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.specialCard}>
                <Text style={styles.specialName}>{item.name}</Text>

                {item.attack !== null && <Text>⚔️ Attack: {item.attack}</Text>}

                {item.health !== null && <Text>❤️ Health: {item.health}</Text>}

                <Text>⏳ Turns: {item.turn}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CardDataViewer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  hContainer: {
    flexDirection: "row",
  },
  wInput: { flexGrow: 1, borderColor: "grey", borderWidth: 1, marginRight: 5 },
  scrollView: {
    flexGrow: 1,
    marginBottom:50
  },
  card: {
    backgroundColor: "#ACACAC",
    padding: 16,
    borderRadius: 16,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  subtitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  label: {
    fontWeight: "600",
    color: "#FFF",
    //color: "#4F4F0F",
  },
  specialCard: {
    backgroundColor: "#7C7C7C",
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  specialName: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fff",
  },
});

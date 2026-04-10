import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { initCardLoads } from "../thunks/cards";
import { useSelector } from "react-redux";
import { setTokens } from "../slices/tokens";
import { clearRoot } from "../tools/fs";
import { useNavigation } from "expo-router";

type Props = {};

const Home: React.FC = (props: Props) => {
  const d = useDispatch<AppDispatch>();
  const tokens = useSelector((s: RootState) => s.token);
  const cards = useSelector((s: RootState) => s.card);
  const files = useSelector((s: RootState) => s.files);
  const user = useSelector((s: RootState) => s.user);
  const n=useNavigation()
  let isLoaded=false;
  useEffect(() => {
    //load cards of user
    if (tokens && !isLoaded) {
    isLoaded=true
      d(initCardLoads(tokens));
      
    }
  }, []);

  return (
    <View>
      <Text>Home</Text>
      <Text>{JSON.stringify(tokens)}</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Button title="List" onPress={()=>n.navigate('List')}></Button>
      <Button title="Scan" onPress={()=>n.navigate('Scan')}></Button>
      <Button title="disconnect" onPress={()=>d(setTokens({API_REQUEST_TOKEN:null,API_TOKEN:null}))} color={'orange'}></Button>
      <Button title="forceDeleteDir" onPress={()=>clearRoot()} color={'tomato'}></Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

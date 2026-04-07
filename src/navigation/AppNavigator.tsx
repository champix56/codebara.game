import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Home from "../screens/Home";
import { Modal } from "react-native";
import List from "../screens/List";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Update: undefined;
  Scan: undefined;
  List: undefined;
  Arena: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const userId = useSelector((state: RootState) => state.user.id);
  const modal = useSelector((s: RootState) => s.popup);
  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userId ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="List"
              component={List}
              options={{ headerShown: true }}
            />
            {/*<Stack.Screen name="Update" component={UpdateScreen} options={{ title: 'Modifier mon compte' }} />
            <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scanner' }} />
            <Stack.Screen name="List" component={ConnectedListScreen} options={{ title: 'Ma collection' }} />
            <Stack.Screen name="Arena" component={ArenaScreen} options={{ headerShown: false }}  /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
// import { setUser } from "../store/slices/userSlice";
// import { setTokens } from "../store/slices/tokenSlice";
import { router } from "expo-router";
import { authUser, registerUser } from "../thunks/user";
import { sha256 } from "js-sha256";
import { useSelector } from "react-redux";

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tokens=useSelector((s:RootState)=>s.token)
  const [isRegister, setIsRegister] = useState(false);
  const [mail, setMail] = useState("god");
  const [password, setPassword] = useState("mdp");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if(tokens.API_REQUEST_TOKEN!=undefined){
      dispatch(authUser(tokens))
    }
  }, [tokens])
  
  // const handleSubmit = async (): Promise<void> => {
  //   try {
  //     if (isRegister) {
  //       const res = await createUser(mail);

  //       if (res.API_TOKEN && res.API_REQUEST_TOKEN) {
  //         dispatch(setTokens({
  //           API_TOKEN: res.API_TOKEN,
  //           API_REQUEST_TOKEN: res.API_REQUEST_TOKEN,
  //         }));
  //       }

  //       setMessage('Compte créé, vérifie tes mails');
  //       return;
  //     }

  //     const res = await authUser({ mail, password });

  //     if ('id' in res) {
  //       dispatch(setUser(res));

  //       router.replace('/home');
  //     } else {
  //       setMessage('Login invalide');
  //     }
  //   } catch {
  //     setMessage('Erreur serveur');
  //   }
  // };
  const handleSubmit = () => {
    if (isRegister) {
      dispatch(registerUser(mail));
    } else {
      dispatch(authUser({ mail: mail, password: sha256(mail + password) }));
      //dispatch(tmpjson())
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../../assets/images/splash-icon.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <Text style={styles.title}>
        {isRegister ? "Inscription" : "Connexion"}
      </Text>

      <TextInput
        placeholder="Email"
        value={mail}
        onChangeText={setMail}
        style={styles.input}
      />

      {!isRegister && (
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      )}

      {message !== "" && <Text style={styles.error}>{message}</Text>}

      <Button
        title={isRegister ? "Créer compte" : "Se connecter"}
        onPress={() => {
          handleSubmit();
        }}
      />

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.link}>
          {isRegister ? "Déjà un compte ?" : "Créer un compte"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: -100,
  },
  imgContainer: { alignItems: "center" },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
  },
  error: { color: "red", textAlign: "center" },
  link: { marginTop: 10, color: "blue", textAlign: "center" },
});

export default LoginScreen;

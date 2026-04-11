import { AppState, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { hidePopup } from "../../slices/popup";

type Props = {};

const Modal = (props: Props) => {
  const datas = useSelector((s: RootState) => s.popup);
  const d=useDispatch<AppDispatch>()
  if (datas.show)
    return (
      <View style={styles.absolute}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/splash-icon.png")}
              style={styles.image}
            />
          </View>
          <ScrollView style={styles.scroll}>
            <View>
              <Text style={styles.message}>{datas.message}</Text>
            </View>
          </ScrollView>
          {datas.buttonOk&&<View style={styles.buttons}>
            <Button title="ok" onPress={()=>{
                d(hidePopup())
            }}></Button>
          </View>}
        </View>
      </View>
    );
  else return null;
};

export default Modal;

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#AFAFAFCF",
  },
  container: {
    marginTop:150,
    maxHeight:'80%',
    marginLeft:40,
    marginRight:40,
    backgroundColor:'white',
    borderRadius:10,
    boxShadow:'10 10 20 GREY',
    paddingHorizontal:20
  },
  imageContainer: { marginTop: -40, justifyContent: "center", flexDirection:'row', marginBottom:20 },
  image: {
    width: 50,
    height: 70,
   
  },
  scroll:{flexGrow:1 , marginBottom:25},
  message:{textAlign:'center'},
  buttons: { gap: 20, justifyContent: "center", flexDirection:'row', marginBottom:10 },
});

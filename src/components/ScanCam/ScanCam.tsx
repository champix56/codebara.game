import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ScanCam.styles";
import { useDispatch } from "react-redux";
import { requestCardBycb } from "../../thunks/cards";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigation } from "expo-router";
const ScanCam: React.FC<{
  onBarCodeScanned: (codeEvt: BarcodeScanningResult) => void;
}> = (props) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<undefined | string>(undefined);
  const d = useDispatch<AppDispatch>();
  const tokens = useSelector((s: RootState) => s.token);
  const n = useNavigation();
  useEffect(() => {
    return () => {
      setScanned(undefined)
    }
  }, [])
  
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      {scanned === undefined && (
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: [
              "upc_a",
              "upc_e",
              "ean13",
              "ean8",
              // "code93",
              // "code128",
              // "code39",
            ],
          }}
          onBarcodeScanned={(evt) => {
            if (scanned !== undefined) return;
            //setScanned(evt.data);
            console.log(evt);
            n.goBack();
           
            // if (
            //   evt.type === "datamatrix" ||
            //   evt.type === "code128" ||
            //   evt.type === "code39" ||
            //   evt.type === "upc_e" ||
            //   evt.type === "code93"
            // )
            //   props.onBarCodeScanned(null);
            // else
            //props.onBarCodeScanned(evt);
            d(requestCardBycb({ primaryTokens: tokens, cb: evt.data }));
            n.navigate("Viewer");
            //setScanned(undefined)
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};
export default ScanCam;

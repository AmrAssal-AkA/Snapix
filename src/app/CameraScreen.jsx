import { FontAwesome } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const CameraRef = useRef(null);
  const router = useRouter();

  const { status } = useCameraPermissions();
  if (status !== "granted") {
    return Alert.alert(
      "Camera Permission Required",
      "This app needs camera access to take photos.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Grant Permission", onPress: requestPermission },
      ],
    );
  }

  function toggleCameraFacing() {
    setFacing((prevFacing) => (prevFacing === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (CameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await CameraRef.current.takePictureAsync(options);
      setPhoto(data);
    }
  }

  function savePhoto() {
    if (photo) {
      router.Params.onPhotoCaptured(photo);
      router.back();
    }
  }
  return (
    <View style={{ flex: 1 }}>
      {photo ? (
        <View style={styles.container}>
          <Image source={{ uri: photo.uri }} style={styles.camera} />
          <Button title="Retake" onPress={() => setPhoto(null)} />
          <Button title="Save" onPress={savePhoto} style={styles.saveButton} />
        </View>
      ) : (
        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={CameraRef}
            mirror={false}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.back()}
            >
              <Text style={styles.text}>
                <FontAwesome name="close" size={24} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>
                <FontAwesome name="retweet" size={24} color="white" />
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
            <Text style={styles.text}>
              <FontAwesome name="camera" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    left: 10,
    top: 35,
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingHorizontal: 12,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  shutterButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
    left: "50%",
    marginLeft: -30,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

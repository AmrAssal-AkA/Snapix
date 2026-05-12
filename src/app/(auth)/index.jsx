import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.overlay} />
      </View>
      <View style={styles.content}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          Welcome to{" "}
          <Text style={styles.brandName}> Snapix</Text>{" "}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "gray",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Where Are Your Memories? Are Live here. Capture, Share, and Relive
          Your Moments with Snapix.
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => router.push("(auth)/signup")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("(auth)/login")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ff6200",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    height: "50%",
    width: "100%",
    marginBottom: 4,
  },
  button: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: "#ff6200",
    padding: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  brandName: {
    color: "#ff6200",
    fontWeight: "bold",
    fontSize: 40,
    fontFamily: "Cochin",
  }
});

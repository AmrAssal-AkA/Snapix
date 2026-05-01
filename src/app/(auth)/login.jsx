import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";

const LoginPage =  () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginCardinates =async () => {
    const { error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  }


  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 40 }}>
        <Text style={{ fontSize: 50, fontWeight: "bold", color: "#ff6200" }}>Snapix</Text>
      </View>

      <View style={{ alignItems: "center" }}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>Good to see you again!</Text>
      </View>

      <View style={{ width: "90%", marginTop: 20 }}>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput placeholder="example@example.com" style={styles.input} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.label}>Password</Text>
          <TextInput placeholder="Enter your password" secureTextEntry style={styles.input} />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Pressable style={styles.button} onPress={() => console.log("Login button pressed")}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
          <View style={styles.AlternativeLogin}>
            <Text style={{color: "gray", fontSize: 16}}>or continue with</Text>

        <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}>
          <Pressable style={{ ...styles.button, backgroundColor: "#3b5998", marginRight: 10 }} onPress={() => console.log("Login with Facebook")}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <FontAwesome name="facebook" size={20} color="white" style={{ marginRight: 10 }} />
              <Text style={styles.buttonText}>Facebook</Text>
            </View>
          </Pressable>
          
          <Pressable style={{ ...styles.button, backgroundColor: "#db4437", marginLeft: 10 }} onPress={() => console.log("Login with Google")}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <FontAwesome name="google" size={20} color="white" style={{ marginRight: 10 }} />
              <Text style={styles.buttonText}>Google</Text>
            </View>
          </Pressable>
        </View>
          </View>

        <View style={{ alignItems: "center" }}>
          <Text>Don't have an account? <Link href="(auth)/signup" style={{color: "#ff6200"}}>Sign Up</Link></Text>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ff6200"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  AlternativeLogin: {
    alignItems: "center",
  }
});

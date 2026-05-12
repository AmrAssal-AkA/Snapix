import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLoginCardinates = async () => {
    console.log("Button pressed")
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long.",
      );
      return;
    }
    console.log("validation stage passed")
    try {
      setLoading(true);
      console.log("Attempting to sign in with email:", email);
   await signIn(email, password);
   console.log("Sign in successful, navigating to main app...");
    }catch(error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
  const handleContinueWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
      if (data.url) {
        await Linking.openURL(data.url);
      }
    } catch (error) {
      Alert.alert("Google Login Error", error.message);
      console.log("Error logging in with Google:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 40 }}>
        <Text style={{ fontSize: 50, fontWeight: "bold", color: "#ff6200" }}>
          Snapix
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>Good to see you again!</Text>
      </View>

      <View style={{ width: "90%", marginTop: 20 }}>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.label}>Email</Text>
          <FontAwesome
            name="envelope"
            size={20}
            color="gray"
            style={{ position: "absolute", top: 40, left: 10 }}
          />
          <TextInput
            placeholder="example@example.com"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.label}>Password</Text>
          <FontAwesome
            name="lock"
            size={20}
            color="gray"
            style={{ position: "absolute", top: 40, left: 10 }}
          />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            autoComplete="password"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity
            style={[styles.button, loading && { backgroundColor: "gray" }]}
            onPress={handleLoginCardinates}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={24} color="white" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.AlternativeLogin}>
          <Text style={{ color: "gray", fontSize: 16 }}>or continue with</Text>

          <View
            style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
          >
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: "#db4437",
                marginLeft: 10,
              }}
              onPress={handleContinueWithGoogle}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name="google"
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.buttonText}>Google</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text>
            Don't have an account?{" "}
            <Link href="(auth)/signup" style={{ color: "#ff6200" }}>
              Sign Up
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    borderRadius: 5,
    paddingLeft: 40,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ff6200",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  AlternativeLogin: {
    alignItems: "center",
  },
});

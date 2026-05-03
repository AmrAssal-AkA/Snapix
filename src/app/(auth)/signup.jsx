import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router, useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async () => {
    if (!userName.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long.",
      );
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            username: userName.trim(),
          },
        },
      });
      if (error) {
        setError(error.message);
        Alert.alert("Signup Error", error.message);
        return;
      }
      Alert.alert(
        "Signup Successful",
        "Please check your email to confirm your account.",
      );
    } catch (error) {
      console.log("Error signing up:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const redirectUri = makeRedirectUri({
      scheme: "snapix",
    });
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });
      if (error) {
        setError(error.message);
        Alert.alert("Google Signup Error", error.message);
        return;
      }
      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
        if(result.type === "success"){
          const URL = new URL(result.url);
          await supabase.auth.setSession({
            access_token: URL.searchParams.get("access_token"),
            refresh_token: URL.searchParams.get("refresh_token"),
          });
          
          Alert.alert("Signup Successful", "You have successfully signed up with Google!"),
          router.push("/(tabs)/");
        } else {
          Alert.alert("Google Signup Error", "Authentication was cancelled.");
        }
      }
    } catch (error) {
      console.log("Error signing up with Google:", error.message);
    } finally {
      setLoading(false);
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
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Create an account
        </Text>
        <Text style={{ color: "gray", fontSize: 16 }}>
          Join us and start sharing your moments!
        </Text>
      </View>

      <View style={styles.regieterContainer}>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.label}>Full Name</Text>
          <FontAwesome
            name="user"
            size={20}
            color="gray"
            style={{ position: "absolute", top: 40, left: 10 }}
          />
          <TextInput
            placeholder="John Doe"
            style={styles.input}
            onChangeText={setUserName}
          />
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text style={styles.label}>Email</Text>
          <FontAwesome
            name="envelope"
            size={20}
            color="gray"
            style={{ position: "absolute", top: 40, left: 10 }}
          />
          <TextInput
            placeholder="example@email.com"
            style={styles.input}
            onChangeText={setEmail}
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
            onChangeText={setPassword}
          />
        </View>

        <View style={{ marginBottom: 15 }}>
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Text>
          </Pressable>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text>Or Continue With</Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: "#db4437",
                marginLeft: 10,
              }}
              onPress={handleGoogleSignup}
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

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>
            Already have an account?{" "}
            <Link
              href="(auth)/login"
              style={{ color: "#ff6200", fontWeight: "bold" }}
            >
              <Text style={{ color: "#ff6200", fontWeight: "bold" }}>
                Log In
              </Text>
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  regieterContainer: {
    width: "90%",
    marginTop: 20,
    borderCurved: 10,
    padding: 20,
    borderBlockColor: "gray",
    borderRadius: 10,
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
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, router, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  console.log("Profile image url", user?.profilePicture);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {user?.profilePicture && !imageError ? (
          <>
            {imageLoading && (
              <ActivityIndicator
                size="large"
                color="#ff6200"
                style={styles.loader}
              />
            )}
            <Image
              source={{ uri: user.profilePicture }}
              style={styles.image}
              onLoadStart={() => {
                console.log("Image loading started");
                setImageLoading(true);
              }}
              onLoadEnd={() => {
                console.log("Image loaded successfully");
                setImageLoading(false);
              }}
              onError={(error) => {
                console.error("Image load error:", error);
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          <FontAwesome5 name="user-circle" size={140} color="#999" />
        )}
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user?.name}</Text>

      <View></View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  loader: {
    position: "absolute",
    zIndex: 10,
  },
});

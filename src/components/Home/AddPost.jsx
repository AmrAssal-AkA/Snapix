import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { createPost } from "../../services/postServices";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useFileUpload } from "../../hooks/useFileUpload";
import CameraScreen from "../../app/CameraScreen";
import { useRouter } from "expo-router";

export default function AddPost() {
  const { user } = useAuth();
  const { handleUpload } = useImageUpload();
  const { handlePickDocument } = useFileUpload();
  const [file, setFile] = useState([]);
  const textRef = useRef("");
  const router = useRouter();

  function handleCreatePost() {
    const body = textRef.current.value;
    try {
      createPost(user.id, body, file.length > 0 ? file[0].uri : null);
      textRef.current.clear();
      setFile([]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }
  return (
    <View style={styles.createPostContainer}>
      <Image
        source={{
          uri: user?.profilePicture,
        }}
        style={styles.avatar}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          ref={textRef}
          style={styles.textInput}
          placeholder="What's on your mind?"
        />
        <Pressable
          style={[styles.createPostButton, !user && styles.disabledButton]}
          onPress={handleCreatePost}
          disabled={!user}
        >
          <Text style={styles.createPostButtonText}>Post</Text>
        </Pressable>
      </View>
      {file && file.length > 0 && (
        <Image
          source={{ uri: file[0].uri }}
          style={{ width: 100, height: 100, marginTop: 15, borderRadius: 10 }}
        />
      )}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            handleUpload({
              onImageUploaded: (imageData) => setFile([imageData]),
            })
          }
        >
          <FontAwesome5 name="image" size={22} color="#4CAF50" />
          <Text style={styles.actionText}>Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            router.push({
              pathname: "/CameraScreen",
              params: {
                onPhotoCaptured: (photoData) => setFile([photoData]),
              },
            });
          }}
        >
          <FontAwesome5 name="camera" size={22} color="#F44336" />
          <Text style={styles.actionText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            handlePickDocument({
              onFileUploaded: (fileData) => setFile([fileData]),
            })
          }
        >
          <FontAwesome5 name="file" size={22} color="#FF9800" />
          <Text style={styles.actionText}>files</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  createPostContainer: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 8,
    borderBottomColor: "#F0F2F5",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    position: "absolute",
    top: 25,
    left: 15,
    zIndex: 1,
  },
  textInputContainer: {
    backgroundColor: "#F0F2F5",
    borderRadius: 15,
    marginTop: 10,
    paddingHorizontal: 15,
    marginLeft: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#65676B",
    paddingVertical: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E4E6EB",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#65676B",
    fontWeight: "600",
  },
});

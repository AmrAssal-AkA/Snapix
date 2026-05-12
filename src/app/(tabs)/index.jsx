import React, { useRef, useState } from "react";
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

import StoryCircle from "../../components/Home/StoryCircle";
import { useAuth } from "../../context/AuthContext";
import { useImageUpload } from "../../hooks/useImageUpload";
import PostHolder from "../../components/Home/Posts";
import { createPost } from "../../services/postServices";
import AddPost from "../../components/Home/AddPost";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <StoryCircle />
      <AddPost />
        <PostHolder
        />

    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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


});

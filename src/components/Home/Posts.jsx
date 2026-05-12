import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

const PostHolder = ({image, username, postText, avatar}) => {
    const [isData, setIsData] = useState(!!postText || !!image);

  return (
    <View style={styles.cardContainer}>
        {isData ? (
      <>
        <View style={styles.content}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            {avatar && <Image source={typeof avatar === 'string' ? { uri: avatar } : avatar} style={styles.avatar} />}
            <Text style={styles.username}>{username}</Text>
          </View>
          <Text style={styles.postText}>
              {postText}
          </Text>
        {image && <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.Image} />}

        <View style={styles.React}>
          <Pressable style={styles.interactButton}>
            <FontAwesome name="thumbs-up" size={24} color="#65676B" style={{ marginLeft: 5 }} />
          </Pressable>
          <Pressable style={styles.interactButton}>
            <FontAwesome name="comment" size={24} color="#65676B" style={{ marginLeft: 5 }} />
          </Pressable>
          <Pressable style={styles.interactButton}>
            <FontAwesome name="share" size={24} color="#65676B" style={{ marginLeft: 5 }} />
          </Pressable>
        </View>
        </View>
      </>
      )
      : <Text style={{ fontSize: 20, color: "#333" , textAlign: "center"}}>No posts yet.</Text>}
    </View>
  );
};

export default PostHolder;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  Image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  avatar: {
    width: 35,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  React: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderTopColor: "#757575",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  interactButton: {
    color: "#65676B",
    fontSize: 24,
    marginLeft: 15,
  }
});

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useImageUpload } from '../../hooks/useImageUpload'
import { uploadProfileImage } from '../../lib/storage';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';



export default function OnBoardingScreen() {
  const { handleUpload } = useImageUpload();
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState("");
  const {user, updateUser} = useAuth();
  const router = useRouter();

  const showImagePicker = () => {
    Alert.alert("Take a Photo", "Choose from library or take a new photo", [
      { text: "Take Photo", onPress: () => handleUpload({ source: 'camera', onImageUploaded: (profilePicture) => {
        setPicture(profilePicture);
        setLoading(false);
      } }) },
      { text: "Choose from Library", onPress: () => handleUpload({ source: 'library', onImageUploaded: (profilePicture) => {
        setPicture(profilePicture);
        setLoading(false);
      } }) },
      { text: "Cancel", style: "cancel" },
    ])
  }

  const handleCompleteProfile = async () => {
    setLoading(true);

      if(!name.trim() || name.length < 3){
        Alert.alert("Validation Error", "Name must be at least 3 characters long.");
        setLoading(false);
        return;
      }
      try{
        let profilePictureUrl = null;
       if(picture){
        console.log("Uploading profile picture..." + picture.uri);
        profilePictureUrl = await uploadProfileImage( user.id, picture.uri);
       }
       await updateUser({name, profilePicture: profilePictureUrl, onboardingComplete: true});
        router.replace("/(tabs)/");
      }catch(error){
        console.error("Error completing profile:", error);
        Alert.alert("Failed to complete profile", "An error occurred while completing your profile. Please try again.");
      }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Complete Profile Page</Text>
      <Text style={{ marginBottom: 20 , color: 'gray' }}>Add Your Profile Picture</Text>

      <View style={styles.profileContainer}>
        <Text style={styles.text}>Profile Picture</Text>
        {picture ? (
          <Image source={{ uri: picture.uri }} style={styles.profilePicture} />
        ) :(
          <View style={styles.placeholder} />
        )}
        <TouchableOpacity style={styles.button} onPress={showImagePicker}>
          {loading ? (<ActivityIndicator color="#fff" />) : (<Text style={styles.buttonText}>Upload Profile Picture</Text>)}
        </TouchableOpacity>
      </View>
        <View style={styles.profileContainer}>
          <Text style={styles.text}>name</Text>
          <TextInput placeholder="Enter your name that will display on your profile" style={styles.input} value={name} onChangeText={setName} />
        </View>
      <TouchableOpacity style={styles.completeButton} onPress={handleCompleteProfile}>
        <Text style={styles.buttonText}>Complete Profile</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#666',
  },
  button: {
    backgroundColor: '#ff6200',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  completeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: 250,
    marginTop: 10,
  },
})
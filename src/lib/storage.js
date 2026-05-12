import {File}from "expo-file-system";
import { supabase } from "./supabase";
import { Alert } from "react-native";
import { decode } from "base64-arraybuffer";
import { readAsStringAsync } from "expo-file-system/legacy";

export const uploadProfileImage = async (userId, imageUri) => {
  try {
    const fileExtension = imageUri.split(".").pop();
    const fileName = `${userId}/profile.${fileExtension}`;
    const base64 = await readAsStringAsync(imageUri, { encoding: "base64" });
    const bytes = Uint8Array.from(decode(base64));

    const { error } = await supabase.storage
      .from("profiles")
      .upload(fileName, bytes, {
        contentType: `image/${fileExtension}`,
        upsert: true,
      });
    if (error) throw error;

    const { data: urlData } = await supabase.storage
      .from("profiles")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    Alert.alert(
      "Failed to upload image",
      "An error occurred while uploading your profile picture. Please try again.",
    );
  }
};

export const postImageUpload = async (postId, imageUri) => {
  try{
    
  }catch(error){
    
  }
}
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { supabase } from '../../utils/supabase'


const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [website, setWebsite] = useState(null);

  const getProfileData = async () => {
    try{
      setLoading(true);
      setError(null);

      const {data, error, status} = await supabase.from("profiles").select("username, avatar_url").eq("id", userId).single();
      if (error && status !== 406) {
        throw error;
      }
      if(data){
        setUserName(data.username);
        setAvatarUrl(data.avatar_url);
        setWebsite(data.website);
      }
    }catch(error){
      setError(error.message);
    }finally{
      setLoading(false);
    }
  }

  const updateprofileData = async ({username, avatarUrl, website}) => {
    try {
      setLoading(true);
      setError(null);

      const updates ={
        id: userId,
        username,
        avatar_url: avatarUrl,
        website,
        updated_at: new Date().toISOString(),
      }
      let errors = await supabase.from("profiles").upsert(updates);
      if(errors){
        throw errors;
      }
    }catch(error){
      setError(error.message);
    }finally{
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}  >
      <View style={styles.profileContainer}>
        <Text style={styles.profileTitle}>{userName}</Text>
        <Text style={styles.profileSubtitle}>{website}</Text>
      </View>
    </View>
  )
}


export default ProfilePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContainer: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        margin: 20
    },
    profileTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333"
    },
    profileSubtitle: {
        fontSize: 16,
        color: "#666"
    }
})
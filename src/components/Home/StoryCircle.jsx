import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';



export default function StoryCircle() {
  const {user} = useAuth()


  const STORIES = [
    { id: 1, name: 'Your Story', avatar: user?.profileImage_url , isUser: true },
  ]

  return (
    <View style={styles.storiesSection}>
      <FlatList
        data={STORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.storyContainer}>
            <View style={styles.storyAvatarContainer}>
              <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
              {item.isUser && (
                <View style={styles.addStoryIconContainer}>
                  <Feather name="plus" size={14} color="white" />
                </View>
              )}
            </View>
            <Text style={styles.storyName} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  storiesSection: {
    backgroundColor: '#FAFAFA',
  },
  storiesList: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 72,
  },
  storyAvatarContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#FF6A00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  addStoryIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3498db',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FAFAFA',
  },
  storyName: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginHorizontal: 16,
  },
});
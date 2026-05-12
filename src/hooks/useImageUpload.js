import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native';


export const useImageUpload = () => {
    const handleUpload = async ({ onImageUploaded, source="library" }) => {
      let result;

      if(source === "camera"){
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Permission to access camera was denied');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          quality: 1,
        });
      }else{
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Permission to access media library was denied');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }
      if (result.canceled) {
        Alert.alert('Image Selection Cancelled', 'You did not select an image');
        return;
      }

      if(result){
          let uri = result.assets[0].uri;
          let type = result.assets[0].mimeType;
          onImageUploaded({ uri, type });
      }


    }

    return { handleUpload };
}
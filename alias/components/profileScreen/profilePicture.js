import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import { Text, Icon } from '@rneui/themed';
import { profile } from '../../constants/profileScreen';

export default function ProfilePictureComponent({ profilePicture, handleUploadPicture, language }) {
  const { uploadPic } = profile;

  return (
    <View style={styles.profilePictureContainer}>
      {profilePicture ? (
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      ) : (
        <Icon name="account-circle" type="material-community" size={120} color={'white'} />
      )}
      <TouchableHighlight onPress={handleUploadPicture}>
        <Text style={styles.uploadText}>{uploadPic[language]}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  }
});
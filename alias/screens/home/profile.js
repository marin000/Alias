import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { Text, Card, Icon, Divider } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { profile } from '../../constants/profileScreen';
import { register } from '../../constants/registerScreen';
import { RegisterSchema } from '../../utils/formValidator';
import backgroundImage from '../../assets/blurred-background.jpeg';
import BackButton from '../../components/backButton';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../utils/helper';
import api from '../../api/players';
import ProfilePictureComponent from '../../components/profileScreen/profilePicture';
import EditProfile from '../../components/profileScreen/editProfile';
import TeamStats from '../../components/profileScreen/teamStats';
import { globalStyles } from '../../styles/global';

const Profile = ({ navigation, userData }) => {
  const { language } = useContext(SettingsContext);
  const { playedTxt, wonTxt, lostTxt, cameraAccess } = profile;
  const { duplicateEmailErrorTxt, duplicateNameErrorTxt } = register;
  const { name, email, country, team, image, gamesPlayed, gamesWin, gamesLost } = userData;
  const [showTeamStats, setShowTeamStats] = useState(false);
  const [profilePicture, setProfilePicture] = useState(image);
  const [isUploading, setIsUploading] = useState(false);
  const [editNameFlag, setEditNameFlag] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editEmailFlag, setEditEmailFlag] = useState(false);
  const [editedEmail, setEditedEmail] = useState(email);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();

  const toggleTeamStats = () => {
    setShowTeamStats((prevShowTeamStats) => !prevShowTeamStats);
  };

  const handleUploadPicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(cameraAccess[language]);
      return;
    }
    
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    setIsUploading(true);
    
    if (!imageResult.canceled && imageResult.assets.length > 0) {
      const image = imageResult.assets[0];
      const newImage = await uploadImage(image);
      const updateFields = { id: userData._id, image: newImage };
      const updatedPlayer = { ...userData, image: newImage };
      api.updatePLayer(updateFields)
        .then(() => {
          setProfilePicture(newImage);
          setIsUploading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch(updateUser(updatedPlayer));
    }
  }

  const handleBackdropPress = () => {
    setEditNameFlag(false);
    setEditEmailFlag(false);
    setEmailError('');
    setNameError('');
    setEditedName(name);
    setEditedEmail(email);
    Keyboard.dismiss();
  }

  const handleUpdateEmail = async () => {
    const updateFields = { id: userData._id, email: editedEmail };
    const updatedPlayer = { ...userData, email: editedEmail };
    try {
      setEmailError('');
      await RegisterSchema(language).validateAt('email', { email: editedEmail });
      api.updatePLayer(updateFields)
        .then(() => {
          setEditEmailFlag(false);
        })
        .catch((err) => {
          const errorResponse = err.response.data;
          const dbProperty = errorResponse.error.split(' ')[0];
          if (dbProperty === 'Email') {
            setEmailError(duplicateEmailErrorTxt[language]);
          }
          console.log(errorResponse);
        });
      dispatch(updateUser(updatedPlayer));
    } catch (err) {
      setEmailError(err.message);
      console.log(err);
    }
  }

  const handleUpdateName = async () => {
    const updateFields = { id: userData._id, name: editedName };
    const updatedPlayer = { ...userData, name: editedName };
    try {
      setNameError('');
      await RegisterSchema(language).validateAt('name', { name: editedName });
      api.updatePLayer(updateFields)
        .then(() => {
          setEditNameFlag(false);
        })
        .catch((err) => {
          const errorResponse = err.response.data;
          const dbProperty = errorResponse.error.split(' ')[0];
          if (dbProperty === 'Name') {
            setNameError(duplicateNameErrorTxt[language]);
          }
          console.log(errorResponse);
        });
      dispatch(updateUser(updatedPlayer));
    } catch (err) {
      setNameError(err.message);
      console.log(err);
    }
  }

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.mainContainer} resizeMode={'cover'} >
      <TouchableWithoutFeedback onPress={editEmailFlag || editNameFlag ? handleBackdropPress : null}>
        <View>
          <BackButton onPress={() => navigation.goBack()} />

          <ProfilePictureComponent
            profilePicture={profilePicture}
            handleUploadPicture={handleUploadPicture}
            language={language}
            isUploading={isUploading}
          />

          <Card containerStyle={styles.card}>
            <EditProfile
              isEditing={editNameFlag}
              value={editedName}
              onChangeText={setEditedName}
              onSave={handleUpdateName}
              onEdit={() => setEditNameFlag(true)}
              label={name}
              errorText={nameError}
            />
            <Divider style={globalStyles.profileDivider} />
            <EditProfile
              isEditing={editEmailFlag}
              value={editedEmail}
              onChangeText={setEditedEmail}
              onSave={handleUpdateEmail}
              onEdit={() => setEditEmailFlag(true)}
              label={email}
              errorText={emailError}
            />
            <Divider style={globalStyles.profileDivider} />
            <View style={globalStyles.profileRow}>
              <Icon name="earth" type="material-community" size={24} />
              <Text style={globalStyles.profileInfo}>{country}</Text>
            </View>
            <Divider style={globalStyles.profileDivider} />
            {team && (
              <TeamStats
                showTeamStats={showTeamStats}
                toggleTeamStats={toggleTeamStats}
                team={team}
                language={language}
              />
            )}
            <View style={globalStyles.profileRow}>
              <Icon name="gamepad-variant" type="material-community" size={24} />
              <Text style={globalStyles.profileInfo}>{playedTxt[language]}{gamesPlayed}</Text>
            </View>
            <Divider style={globalStyles.profileDivider} />
            <View style={globalStyles.profileRow}>
              <Icon name="trophy" type="material-community" size={24} />
              <Text style={globalStyles.profileInfo}>{wonTxt[language]}{gamesWin}</Text>
            </View>
            <Divider style={globalStyles.profileDivider} />
            <View style={globalStyles.profileRow}>
              <Icon name="close" type="material-community" size={24} />
              <Text style={globalStyles.profileInfo}>{lostTxt[language]}{gamesLost}</Text>
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 30,
    marginTop: 30
  }
});

Profile.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state) => ({
  userData: state.userReducer.userData
});

const mapDispatchToProps = {
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
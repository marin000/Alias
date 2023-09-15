import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import {
  updateUser,
  deleteAllTeams,
  gameStartEnd,
  updateMaxScoreReached,
  updateTeamIndex
} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../utils/auth';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Alert
} from 'react-native';
import { Text, Card, Icon, Divider, Button } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { profile } from '../../constants/profileScreen';
import { register } from '../../constants/registerScreen';
import { RegisterSchema } from '../../utils/formValidator';
import BackButton from '../../components/backButton';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../utils/helper';
import api from '../../api/players';
import ProfilePictureComponent from '../../components/profileScreen/profilePicture';
import EditProfile from '../../components/profileScreen/editProfile';
import TeamStats from '../../components/profileScreen/teamStats';
import { globalStyles } from '../../styles/global';

const Profile = ({ navigation, userData, teams }) => {
  const { language } = useContext(SettingsContext);
  const { playedTxt, wonTxt, lostTxt, cameraAccess, buttonChangePass,
    buttonLogout, alertConfirmation, alertLogOutTxt, alertCancelTxt, alertContinueTxt } = profile;
  const { duplicateEmailErrorTxt, duplicateNameErrorTxt } = register;
  const { name, email, country, team, image, gamesPlayed, gamesWin, gamesLost } = userData ?? {};
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
      const imageObj = { newImage };
      if (profilePicture) {
        imageObj.oldImage = profilePicture;
      }
      const updateFields = { id: userData._id, image: imageObj };
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

  const handleLogout = () => {
    const logoutAndRedirect = () => {
      removeToken();
      dispatch(updateUser(null));
      navigation.navigate('Home');
    }
    if (teams.length > 0) {
      Alert.alert(
        alertConfirmation[language],
        alertLogOutTxt[language],
        [
          {
            text: alertCancelTxt[language],
            style: 'cancel'
          },
          {
            text: alertContinueTxt[language],
            onPress: () => {
              dispatch(deleteAllTeams());
              dispatch(gameStartEnd(false));
              dispatch(updateMaxScoreReached(false));
              dispatch(updateTeamIndex(0));
              logoutAndRedirect();
            },
          },]);
    } else {
      logoutAndRedirect();
    }
  }

  return (
    <View style={globalStyles.mainContainer} resizeMode={'cover'} >
      <ScrollView>
        {userData && (
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
              <View style={styles.buttonContainer}>
                <View>
                  <Button
                    title={buttonChangePass[language]}
                    onPress={() => navigation.navigate('ChangePassword')}
                    buttonStyle={globalStyles.roundButton}
                  />
                </View>
                <View style={styles.buttonLogout}>
                  <Button
                    title={buttonLogout[language]}
                    type='outline'
                    onPress={handleLogout}
                    buttonStyle={{ ...globalStyles.roundButton, borderColor: 'red' }}
                    titleStyle={{ color: 'red' }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...globalStyles.cardContainer,
    padding: 30,
    marginTop: 30
  },
  buttonContainer: {
    marginHorizontal: 15,
    marginTop: 40,
    marginBottom: 15
  },
  buttonLogout: {
    marginTop: 20
  }
});

Profile.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state) => ({
  userData: state.userReducer.userData,
  teams: state.teamReducer.teams
});

const mapDispatchToProps = {
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
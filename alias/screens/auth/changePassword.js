import React, { useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../utils/auth';
import { Formik } from 'formik';
import { SettingsContext } from '../../utils/settings';
import { TextInput } from 'react-native-gesture-handler';
import { changePassword } from '../../constants/changePasswordScreen';
import api from '../../api/players'
import backgroundImage from '../../assets/blurred-background.jpeg';
import { globalStyles } from '../../styles/global';
import { ChangePasswordSchema } from '../../utils/formValidator';
import BackButton from '../../components/backButton';

const ChangePassword = ({ userData, navigation }) => {
  const { language } = useContext(SettingsContext);
  const { title,
    currentPassPlaceholder,
    newPassPlaceholder,
    repeatPassPlaceholder,
    submitButton,
    invalidCurrentPassTxt,
    passwordChangeSuccess } = changePassword;
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [invalidCurrentPass, setInvalidCurrentPass] = useState('');
  const dispatch = useDispatch();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prevShowCurrentPassword) => !prevShowCurrentPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword);
  };

  const handleChangePassword = (values) => {
    setInvalidCurrentPass('');
    const passwordObj = {
      oldPassword: values.oldPassword,
      newPassword: values.password
    };
    const updateFields = { id: userData._id, password: passwordObj };
    api.updatePLayer(updateFields)
      .then(() => {
        Alert.alert(
          passwordChangeSuccess[language], '', [{
            text: 'OK',
            onPress: () => {
              removeToken();
              dispatch(updateUser(null));
              navigation.navigate('Login');
            }
          }]);
      })
      .catch((err) => {
        setInvalidCurrentPass(invalidCurrentPassTxt[language]);
        console.log(err);
      });
  };

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <BackButton onPress={() => navigation.navigate('Profile')} />
        <Text style={styles.title}>{title[language]}</Text>
        <Card>
          <Formik
            initialValues={{ oldPassword: '', password: '', repeatPassword: '' }}
            validationSchema={ChangePasswordSchema(language)}
            onSubmit={handleChangePassword}
          >
            {(props) => (
              <View style={globalStyles.form}>
                <View style={globalStyles.entryInputContainer}>
                  <TextInput
                    style={globalStyles.entryInput}
                    placeholder={currentPassPlaceholder[language]}
                    secureTextEntry={!showCurrentPassword}
                    onChangeText={props.handleChange('oldPassword')}
                    value={props.values.oldPassword}
                  />
                  <TouchableOpacity style={globalStyles.eyeIcon} onPress={toggleCurrentPasswordVisibility}>
                    <Icon name={showCurrentPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={globalStyles.errorText}>{props.touched.oldPassword && props.errors.oldPassword}{invalidCurrentPass}</Text>
                <View style={globalStyles.entryInputContainer}>
                  <TextInput
                    style={globalStyles.entryInput}
                    placeholder={newPassPlaceholder[language]}
                    secureTextEntry={!showPassword}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                  />
                  <TouchableOpacity style={globalStyles.eyeIcon} onPress={togglePasswordVisibility}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
                <View style={globalStyles.entryInputContainer}>
                  <TextInput
                    style={globalStyles.entryInput}
                    placeholder={repeatPassPlaceholder[language]}
                    secureTextEntry={!showRepeatPassword}
                    onChangeText={props.handleChange('repeatPassword')}
                    value={props.values.repeatPassword}
                  />
                  <TouchableOpacity style={globalStyles.eyeIcon} onPress={toggleRepeatPasswordVisibility}>
                    <Icon name={showRepeatPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={globalStyles.errorText}>{props.touched.repeatPassword && props.errors.repeatPassword}</Text>
                <Button
                  containerStyle={styles.changePassButton}
                  title={submitButton[language]}
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
        </Card>
      </View>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  title: {
    ...globalStyles.screenTitle,
    marginBottom: 20
  },
  changePassButton: {
    ...globalStyles.buttonSaveTeam,
    marginTop: 25
  }
});

ChangePassword.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state) => ({
  userData: state.userReducer.userData
});

const mapDispatchToProps = {
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
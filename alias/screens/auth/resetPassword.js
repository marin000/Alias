import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import { SettingsContext } from '../../utils/settings';
import { TextInput } from 'react-native-gesture-handler';
import { resetPassword } from '../../constants/resetPasswordScreen';
import api from '../../api/players'
import { globalStyles } from '../../styles/global';
import { ResetPasswordSchema } from '../../utils/formValidator';

export default function ResetPassword({ navigation }) {
  const { language } = useContext(SettingsContext);
  const { title, newPassPlaceholder, repeatPassPlaceholder, submitButton, passwordResetSuccess } = resetPassword;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const playerEmail = navigation.getParam('email');

  useEffect(() => {
    const handleBackButton = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      backHandler.remove();
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword);
  };

  const handleResetPassword = (values) => {
    const data = { email: playerEmail, password: values.password };
    api.resetPlayerPassword(data)
      .then(() => {
        Alert.alert(
          passwordResetSuccess[language], '', [{
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            }
          }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <Text style={styles.title}>{title[language]}</Text>
        <Card containerStyle={globalStyles.cardContainer}>
          <Formik
            initialValues={{ password: '', repeatPassword: '' }}
            validationSchema={ResetPasswordSchema(language)}
            onSubmit={handleResetPassword}
          >
            {(props) => (
              <View style={globalStyles.form}>
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
                  containerStyle={styles.resetPassButton}
                  title={submitButton[language]}
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
        </Card>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    ...globalStyles.screenTitle,
    marginBottom: 20
  },
  resetPassButton: {
    ...globalStyles.buttonSaveTeam,
    marginTop: 10
  }
});

ResetPassword.navigationOptions = {
  headerShown: false,
};
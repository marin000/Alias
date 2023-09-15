import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, BackHandler } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { SettingsContext } from '../../utils/settings';
import { forgotPassword } from '../../constants/forgotPasswordScreen';
import { globalStyles } from '../../styles/global';
import { ForgotPasswordSchema } from '../../utils/formValidator';
import BackButton from '../../components/backButton';
import api from '../../api/email';

export default function ForgotPassword({ navigation }) {
  const { language } = useContext(SettingsContext);
  const { title, subtitle, emailPlaceholder, invalidEmail, sendEmailButton, sentEmailAlert } = forgotPassword;
  const [invalidEmailError, setInvalidEmailError] = useState('');

  const handleBackButton = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  const handleResetPassword = (values) => {
    setInvalidEmailError('');
    const data = {
      email: values.email,
      language
    };
    api.sendEmail(data)
      .then(() => {
        Alert.alert(
          sentEmailAlert[language], '', [{
            text: 'OK',
            onPress: () => {
              navigation.navigate('EnterPin', { email: values.email });
            }
          }]);
      })
      .catch((err) => {
        setInvalidEmailError(invalidEmail[language]);
        console.log(err.response.data);
      });
  }

  return (
    <View style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{title[language]}</Text>
        <Text style={styles.subtitle}>{subtitle[language]}</Text>
        <Card containerStyle={globalStyles.cardContainer}>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema(language)}
            onSubmit={handleResetPassword}
          >
            {(props) => (
              <View style={globalStyles.form}>
                <View style={globalStyles.entryInputContainer}>
                  <TextInput
                    style={globalStyles.entryInput}
                    placeholder={emailPlaceholder[language]}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                  />
                  <Icon name="email-outline" size={24} color="black" style={styles.icon} />
                </View>
                <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}{invalidEmailError}</Text>
                <Button
                  containerStyle={styles.signInButton}
                  title={sendEmailButton[language]}
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
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    marginBottom: 10
  },
  signInButton: {
    ...globalStyles.buttonSaveTeam,
    marginTop: 10
  }
});

ForgotPassword.navigationOptions = {
  headerShown: false,
};
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { SettingsContext } from '../../utils/settings';
import { register } from '../../constants/registerScreen';
import api from '../../api/players'
import backgroundImage from '../../assets/blurred-background.jpeg';
import { globalStyles } from '../../styles/global';
import { RegisterSchema } from '../../utils/formValidator';
import BackButton from '../../components/backButton';
import axios from 'axios';
import { errorMsg } from '../../constants/errorMessages';
import countriesCodes from '../../assets/countryCodes.json';

export default function Register({ navigation }) {
  const { language } = useContext(SettingsContext);
  const { emailPlaceholder, passPlaceholder, usernamePlaceholder, registerTitle, submitButton, repeatPassPlaceholder } = register;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [duplicateEmailError, setDuplicateEmailError] = useState('');
  const [duplicateNameError, setDuplicateNameError] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const getCountryFromIP = async () => {
      try {
        const response = await axios.get('http://ipinfo.io');
        setCountry(countriesCodes[response.data.country]);
      } catch (error) {
        console.error(errorMsg.ipInfo, error);
      }
    };
    getCountryFromIP();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword);
  };

  console.log();

  const handleRegistration = (values) => {
    setDuplicateEmailError('');
    setDuplicateNameError('');
    const newPlayer = {
      name: values.name,
      email: values.email,
      password: values.password,
      country
    };

    api.addNewPLayer(newPlayer)
      .then(() => { navigation.navigate('Login') })
      .catch((err) => {
        const errorResponse = err.response.data;
        const dbProperty = errorResponse.error.split(' ')[0];
        if (dbProperty === 'Email') {
          setDuplicateEmailError(errorResponse.error);
        }
        if (dbProperty === 'Name') {
          setDuplicateNameError(errorResponse.error);
        }
        console.log(errorResponse);
      });
  };

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{registerTitle[language]}</Text>
        <Card>
          <Formik
            initialValues={{ name: '', email: '', password: '', repeatPassword: '' }}
            validationSchema={RegisterSchema(language)}
            onSubmit={handleRegistration}
          >
            {(props) => (
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={usernamePlaceholder[language]}
                    onChangeText={props.handleChange('name')}
                    value={props.values.name}
                  />
                </View>
                <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}{duplicateNameError}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={emailPlaceholder[language]}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                  />
                  <Icon name="email-outline" size={24} color="black" style={styles.icon} />
                </View>
                <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}{duplicateEmailError}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={passPlaceholder[language]}
                    secureTextEntry={!showPassword}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                  />
                  <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={repeatPassPlaceholder[language]}
                    secureTextEntry={!showRepeatPassword}
                    onChangeText={props.handleChange('repeatPassword')}
                    value={props.values.repeatPassword}
                  />
                  <TouchableOpacity style={styles.icon} onPress={toggleRepeatPasswordVisibility}>
                    <Icon name={showRepeatPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={globalStyles.errorText}>{props.touched.repeatPassword && props.errors.repeatPassword}</Text>
                <Button
                  containerStyle={styles.registerButton}
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
  form: {
    paddingTop: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  registerButton: {
    ...globalStyles.buttonSaveTeam,
    marginTop: 25
  },
  icon: {
    marginRight: 0
  }
});

Register.navigationOptions = {
  headerShown: false,
};

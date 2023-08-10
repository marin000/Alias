import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { storeToken } from '../../utils/auth';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { SettingsContext } from '../../utils/settings';
import { login } from '../../constants/loginScreen';
import backgroundImage from '../../assets/blurred-background.jpeg';
import { globalStyles } from '../../styles/global';
import LoginDivider from '../../components/customLoginDivider';
import { LoginSchema } from '../../utils/formValidator';
import BackButton from '../../components/backButton';
import api from '../../api/players';

const GoogleSignInButton = ({ language, onPress }) => {
  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <View style={styles.googleIcon}>
        <Icon name="google" size={24} color="black" />
      </View>
      <Text style={styles.googleButtonText}>{login.googleSignIn[language]}</Text>
    </TouchableOpacity>
  );
};

const Login = ({ navigation }) => {
  const { language } = useContext(SettingsContext);
  const { emailPlaceholder, passwordPlaceholder, signIn, forgotPass, dividerTxt, newToAlias, registerTxt, invalidCredentials } = login;
  const [showPassword, setShowPassword] = useState(false);
  const [invalidLoginError, setInvalidLoginError] = useState('');
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = (values) => {
    setInvalidLoginError('');
    const credentials = {
      email: values.email,
      password: values.password
    };
    api.getPlayer(credentials)
      .then((res) => { 
        const { player, token } = res.data;
        dispatch(updateUser(player));
        storeToken(token);
        navigation.navigate('Home'); 
      })
      .catch((err) => {
        setInvalidLoginError(invalidCredentials[language]);
        console.log(err.response.data);
      });
  }

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{signIn[language]}</Text>
        <Card>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema(language)}
            onSubmit={handleLogin}
          >
            {(props) => (
              <View style={styles.form}>
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
                <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>
                <View style={globalStyles.entryInputContainer}>
                  <TextInput
                    style={globalStyles.entryInput}
                    placeholder={passwordPlaceholder[language]}
                    secureTextEntry={!showPassword}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                  />
                  <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}{invalidLoginError}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPass}>{forgotPass[language]}</Text>
                </TouchableOpacity>
                <Button
                  containerStyle={styles.signInButton}
                  title={signIn[language]}
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
          <LoginDivider text={dividerTxt[language]} />
          <GoogleSignInButton
            language={language}
          // onPress={props.handleSubmit}
          />
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>{newToAlias[language]}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>{registerTxt[language]}</Text>
            </TouchableOpacity>
          </View>
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
  signInButton: {
    ...globalStyles.buttonSaveTeam,
    marginTop: 25
  },
  icon: {
    marginRight: 0
  },
  forgotPass: {
    fontSize: 14,
    color: '#0066ff',
    fontWeight: 'bold'
  },
  googleButton: {
    ...globalStyles.buttonSaveTeam,
    marginTop: -5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 45
  },
  googleIcon: {
    marginRight: 10
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray'
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 20
  },
  registerText: {
    color: 'black',
    fontSize: 14
  },
  registerLink: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066ff',
  },
});

Login.navigationOptions = {
  headerShown: false,
};

const mapDispatchToProps = {
  updateUser
};

export default connect(null, mapDispatchToProps)(Login);
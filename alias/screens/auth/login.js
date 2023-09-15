import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  updateUser,
  deleteAllTeams,
  gameStartEnd,
  updateMaxScoreReached,
  updateTeamIndex
} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { storeToken } from '../../utils/auth';
import { View, StyleSheet, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { SettingsContext } from '../../utils/settings';
import { login } from '../../constants/loginScreen';
import { profile } from '../../constants/profileScreen';
import { globalStyles } from '../../styles/global';
import LoginDivider from '../../components/customLoginDivider';
import { LoginSchema } from '../../utils/formValidator';
import BackButton from '../../components/backButton';
import api from '../../api/players';
import { getCountryFromIP } from '../../utils/helper';

const Login = ({ teams, navigation }) => {
  const { language } = useContext(SettingsContext);
  const { emailPlaceholder, passwordPlaceholder, signIn, forgotPass, dividerTxt, newToAlias, registerTxt, invalidCredentials } = login;
  const { alertConfirmation, alertLogOutTxt, alertCancelTxt, alertContinueTxt } = profile;
  const [showPassword, setShowPassword] = useState(false);
  const [invalidLoginError, setInvalidLoginError] = useState('');
  const dispatch = useDispatch();

  const handleBackButton = () => {
    navigation.navigate('Home');
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginAndRedirect = async (email, password) => {
    const credentials = { email, password };
    const country = await getCountryFromIP();
    api.getPlayer(credentials)
      .then((res) => {
        const { player, token } = res.data;
        if (player.country !== country) {
          player.country = country;
        }
        dispatch(updateUser(player));
        storeToken(token);
        navigation.navigate('Home');
      })
      .catch((err) => {
        setInvalidLoginError(invalidCredentials[language]);
        console.log(err.response.data);
      });
  }

  const handleLogin = async (values) => {
    setInvalidLoginError('');
    if (teams.length > 0) {
      Alert.alert(
        alertConfirmation[language],
        alertLogOutTxt[language],
        [
          {
            text: alertCancelTxt[language],
            style: 'cancel',
          },
          {
            text: alertContinueTxt[language],
            onPress: async () => {
              dispatch(deleteAllTeams());
              dispatch(gameStartEnd(false));
              dispatch(updateMaxScoreReached(false));
              dispatch(updateTeamIndex(0));
              await loginAndRedirect(values.email, values.password)
            },
          },]);
    } else {
      await loginAndRedirect(values.email, values.password);
    }
  }

  return (
    <View style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <BackButton onPress={() => navigation.navigate('Home')} />
        <Text style={styles.title}>{signIn[language]}</Text>
        <Card containerStyle={globalStyles.cardContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema(language)}
            onSubmit={handleLogin}
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
                  title={signIn[language]}
                  onPress={props.handleSubmit}
                  buttonStyle={styles.signInButton}
                />
              </View>
            )}
          </Formik>
          <LoginDivider text={dividerTxt[language]} />
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>{newToAlias[language]}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>{registerTxt[language]}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...globalStyles.screenTitle,
    marginBottom: 20
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
    color: '#2089dc',
    fontWeight: 'bold'
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
    color: '#2089dc',
  },
});

Login.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state) => ({
  teams: state.teamReducer.teams
});

const mapDispatchToProps = {
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
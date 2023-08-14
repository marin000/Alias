import React, { useContext, useState, useRef } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import { SettingsContext } from '../../utils/settings';
import { enterPin } from '../../constants/enterPinScreen';
import backgroundImage from '../../assets/blurred-background.jpeg';
import { globalStyles } from '../../styles/global';
import BackButton from '../../components/backButton';
import api from '../../api/players';

export default function EnterPin({ navigation }) {
  const { language } = useContext(SettingsContext);
  const { title, sendPinButton, invalidPinErrorTxt } = enterPin;
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [invalidPinError, setInvalidPinError] = useState('');
  const inputRefs = useRef([]);
  const playerEmail = navigation.getParam('email');

  const handleDigitChange = (digit, index) => {
    if (index < 3) {
      inputRefs.current[index + 1].focus();
    }

    const newPinDigits = [...pinDigits];
    newPinDigits[index] = digit;
    setPinDigits(newPinDigits);
  };

  const handleSubmit = () => {
    setInvalidPinError('');
    const pin = pinDigits.join('');
    const data = {
      email: playerEmail,
      pin
    };
    api.validatePin(data)
      .then(() => {
        navigation.navigate('ResetPassword');
      })
      .catch((err) => {
        setInvalidPinError(invalidPinErrorTxt[language]);
        console.log(err.response.data);
      });
  }

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{title[language]}</Text>
        <Card>
          <View style={styles.form}>
            <View style={styles.pinContainer}>
              {pinDigits.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(text) => handleDigitChange(text, index)}
                  value={digit}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </View>
            <Text style={globalStyles.errorText}>{invalidPinError}</Text> 
            <Button
              containerStyle={styles.sendPin}
              title={sendPinButton[language]}
              onPress={handleSubmit}
            />
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
  sendPin: {
    ...globalStyles.buttonSaveTeam,
    marginTop: 25
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  input: {
    width: 55,
    height: 55,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    marginRight: 10
  }
});

EnterPin.navigationOptions = {
  headerShown: false,
};
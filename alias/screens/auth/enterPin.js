import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, BackHandler } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import { SettingsContext } from '../../utils/settings';
import { enterPin } from '../../constants/enterPinScreen';
import { globalStyles } from '../../styles/global';
import BackButton from '../../components/backButton';
import api from '../../api/players';

export default function EnterPin({ navigation }) {
  const { language } = useContext(SettingsContext);
  const { title, sendPinButton, invalidPinErrorTxt, timerSecLeft, timerSecTxt, timerExpiredTxt } = enterPin;
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [invalidPinError, setInvalidPinError] = useState('');
  const [remainingTime, setRemainingTime] = useState(60);
  const [timerExpired, setTimerExpired] = useState(false);
  const inputRefs = useRef([]);
  const playerEmail = navigation.getParam('email');

  useEffect(() => {
    const handleBackButton = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        setTimerExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      backHandler.remove();
    };
  }, [remainingTime]);

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
    if (timerExpired) {
      Alert.alert(
        timerExpiredTxt[language], '', [{
          text: 'OK',
          onPress: () => {
            navigation.navigate('ForgotPassword', { email: playerEmail });
          }
        }]);
      return;
    }
    const pin = pinDigits.join('');
    const data = {
      email: playerEmail,
      pin
    };
    api.validatePin(data)
      .then(() => {
        navigation.navigate('ResetPassword', { email: playerEmail });
      })
      .catch((err) => {
        setInvalidPinError(invalidPinErrorTxt[language]);
        console.log(err.response.data);
      });
  }

  return (
    <View style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <Text style={styles.title}>{title[language]}</Text>
        <Text style={styles.timerText}>
          {remainingTime > 0 ?
            `${timerSecLeft[language]}${remainingTime} ${timerSecTxt[language]}`
            : timerExpiredTxt[language]
          }
        </Text>
        <Card containerStyle={globalStyles.cardContainer}>
          <View style={globalStyles.form}>
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
    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    ...globalStyles.screenTitle,
    marginBottom: 20
  },
  sendPin: {
    ...globalStyles.buttonSaveTeam,
    marginTop: 10
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
  },
  timerText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginBottom: 10
  }
});

EnterPin.navigationOptions = {
  headerShown: false,
};
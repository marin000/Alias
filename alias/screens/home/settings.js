import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Card, CheckBox, Image, Slider, Icon } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { settings } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';
import croFlag from '../../assets/cro-flag.png';
import ukFlag from '../../assets/uk-flag.png';

export default function Settings() {
  const { language, updateLanguage, timer, updateTimer, maxScore, updateMaxScore } = useContext(SettingsContext);
  const [selectedRadio, setRadio] = useState(language);
  const [timerValue, setTimerValue] = useState(timer);
  const [maxScoreValue, setMaxScoreValue] = useState(maxScore);
  const { title, roundTime, targetScore } = settings;

  const setLanguage = (selectedLang) => {
    setRadio(selectedLang);
    updateLanguage(selectedLang);
  }

  const setTimer = (value) => {
    setTimerValue(String(value));
    updateTimer(String(value));
  }

  const setMaxScore = (value) => {
    setMaxScoreValue(String(value));
    updateMaxScore(String(value));
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode={'cover'}>
      <View>
        <Text style={styles.title}>{title[language]}</Text>
        <Card>
          <View style={styles.radioContainer}>
            <View style={styles.radio}>
              <Image
                source={croFlag}
                style={styles.flag}
              />
              <CheckBox
                checked={selectedRadio === 'hr'}
                onPress={() => setLanguage('hr')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
            </View>
            <View style={styles.radio}>
              <Image
                source={ukFlag}
                style={styles.flag}
              />
              <CheckBox
                checked={selectedRadio === 'en'}
                onPress={() => setLanguage('en')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
            </View>
          </View>
          <View style={styles.timerView}>
            <Slider
              value={parseInt(timerValue)}
              onValueChange={setTimer}
              maximumValue={100}
              minimumValue={20}
              step={10}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: 'transparent' }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              thumbProps={{
                children: (
                  <Icon
                    name="circle"
                    type="font-awesome"
                    size={10}
                    reverse
                    containerStyle={{ bottom: 10, right: 10 }}
                  />
                ),
              }}
            />
            <Text style={styles.slideValue}>{roundTime[language]}: {timerValue}</Text>
          </View>
          <View style={styles.scoreView}>
            <Slider
              value={parseInt(maxScoreValue)}
              onValueChange={setMaxScore}
              maximumValue={150}
              minimumValue={40}
              step={10}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: 'transparent' }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              thumbProps={{
                children: (
                  <Icon
                    name="circle"
                    type="font-awesome"
                    size={10}
                    reverse
                    containerStyle={{ bottom: 10, right: 10 }}
                  />
                ),
              }}
            />
            <Text style={styles.slideValue}>{targetScore[language]}: {maxScoreValue}</Text>
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
    color: 'white'
  },
  radioContainer: {
    padding: 20,
    flexDirection: 'column'
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flag: {
    width: 24,
    height: 24,
    marginRight: 4
  }, 
  timerView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  scoreView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  slideValue: {
    padding: 10,
    fontSize: 15
  }
});
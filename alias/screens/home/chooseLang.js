import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Card, CheckBox, Image } from '@rneui/themed';
import { LanguageContext } from '../../utils/language';
import { chooseLang } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';
import croFlag from '../../assets/cro-flag.png';
import ukFlag from '../../assets/uk-flag.png';

export default function ChooseLang() {
  const { language, updateLanguage } = useContext(LanguageContext);
  const [selectedRadio, setRadio] = useState(language);
  const { title } = chooseLang;

  const setLanguage = (selectedLang) => {
    setRadio(selectedLang);
    updateLanguage(selectedLang);
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
  }
});
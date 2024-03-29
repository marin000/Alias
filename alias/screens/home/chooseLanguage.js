import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { globalStyles } from '../../styles/global';
import { home } from '../../constants/homeScreen';

export default function ChooseLanguage({ onLanguageUpdate }) {
  const [language, setLanguage] = useState('');
  const { updateLanguage, updateShownChooseLanguage } = useContext(SettingsContext);
  const { chooseLanguageTitle, chooseLanguageButton } = home;
  const languages = [
    { id: 'en', name: 'English' },
    { id: 'hr', name: 'Hrvatski' }
  ];

  const handleSetLanguage = () => {
    updateLanguage(language);
    updateShownChooseLanguage();
    onLanguageUpdate();
  }

  const getLanguageBoxStyle = (languageId) => {
    return {
      ...styles.languageBox,
      backgroundColor: language === languageId ? '#d9d9d9' : '#ffffff'
    };
  };

  return (
    <View style={globalStyles.mainContainer} resizeMode={'cover'}>
      <View>
        <Text style={globalStyles.screenTitle}>{language ? chooseLanguageTitle[language] : chooseLanguageTitle['en']}</Text>
        <Card containerStyle={globalStyles.cardContainer}>
          {languages.map((language) => (
            <TouchableHighlight
              underlayColor="transparent"
              key={language.id}
              onPress={() => setLanguage(language.id)}
            >
              <View style={getLanguageBoxStyle(language.id)}>
                <Text style={styles.languageText}>{language.name}</Text>
              </View>
            </TouchableHighlight>
          ))}
          <Button
            containerStyle={styles.buttonSubmit}
            title={language ? chooseLanguageButton[language] : chooseLanguageButton['en']}
            onPress={handleSetLanguage}
            buttonStyle={globalStyles.roundButton}
            disabled={!language}
          />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSubmit: {
    marginTop: 10
  },
  languageText: {
    fontSize: 18
  },
  languageBox: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
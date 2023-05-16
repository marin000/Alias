import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
	const [language, setLanguage] = useState('hr');
	const [timer, setTimer] = useState('60');
  const [maxScore, setMaxScore] = useState('60');

	useEffect(() => {
		const retrieveSettings = async () => {
			try {
				const storedLanguage = await AsyncStorage.getItem('language');
				if (storedLanguage) {
					setLanguage(storedLanguage);
				}
				const storedTimer = await AsyncStorage.getItem('timer');
				if (storedTimer) {
					setTimer(storedTimer);
				}
				const storedMaxScore = await AsyncStorage.getItem('maxScore');
				if (storedMaxScore) {
					setMaxScore(storedMaxScore);
				}
			} catch (error) {
				console.log('Error retrieving settings from AsyncStorage:', error);
			}
		};
		retrieveSettings();
	}, []);

	const updateLanguage = async (newLanguage) => {
		try {
			setLanguage(newLanguage);
			await AsyncStorage.setItem('language', newLanguage);
		} catch (error) {
			console.log('Error updating language in AsyncStorage:', error);
		}
	};

	const updateTimer = async (newTimer) => {
		try {
			setTimer(newTimer);
			await AsyncStorage.setItem('timer', newTimer);
		} catch (error) {
			console.log('Error updating timer in AsyncStorage:', error);
		}
	};

	const updateMaxScore = async (newMaxScore) => {
		try {
			setMaxScore(newMaxScore);
			await AsyncStorage.setItem('maxScore', newMaxScore);
		} catch (error) {
			console.log('Error updating maxScore in AsyncStorage:', error);
		}
	};

	return (
		<SettingsContext.Provider value={{ language, updateLanguage, timer, updateTimer, maxScore, updateMaxScore }}>
			{children}
		</SettingsContext.Provider>
	);
};

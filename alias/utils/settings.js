import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorMsg } from '../constants/errorMessages';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
	const [language, setLanguage] = useState('hr');
	const [timer, setTimer] = useState('60');
	const [maxScore, setMaxScore] = useState('60');
	const [gameSound, setGameSound] = useState(true);
	const [hasShownChooseLanguage, setHasShownChooseLanguage] = useState(false);
	const {
		retrievingSettings,
		updatingGameSound,
		updatingLanguage,
		updatingMaxScore,
		updatingTimer } = errorMsg;

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
				const storedGameSound = await AsyncStorage.getItem('gameSound');
				if (storedGameSound) {
					setGameSound(storedGameSound);
				}
				const storedHasShownChooseLanguage = await AsyncStorage.getItem('hasShownChooseLanguage');
				if (storedHasShownChooseLanguage) {
					setHasShownChooseLanguage(storedHasShownChooseLanguage);
				}
			} catch (error) {
				console.log(retrievingSettings, error);
			}
		};
		retrieveSettings();
	}, []);

	const updateLanguage = async (newLanguage) => {
		try {
			setLanguage(newLanguage);
			await AsyncStorage.setItem('language', newLanguage);
		} catch (error) {
			console.log(updatingLanguage, error);
		}
	};

	const updateTimer = async (newTimer) => {
		try {
			setTimer(newTimer);
			await AsyncStorage.setItem('timer', newTimer);
		} catch (error) {
			console.log(updatingTimer, error);
		}
	};

	const updateMaxScore = async (newMaxScore) => {
		try {
			setMaxScore(newMaxScore);
			await AsyncStorage.setItem('maxScore', newMaxScore);
		} catch (error) {
			console.log(updatingMaxScore, error);
		}
	};

	const updateGameSound = async (newSound) => {
		try {
			setGameSound(newSound);
			await AsyncStorage.setItem('gameSound', newSound.toString());
		} catch (error) {
			console.log(updatingGameSound, error);
		}
	};

	return (
		<SettingsContext.Provider value={{ language, updateLanguage, timer, updateTimer, maxScore, updateMaxScore, gameSound, updateGameSound, hasShownChooseLanguage }}>
			{children}
		</SettingsContext.Provider>
	);
};

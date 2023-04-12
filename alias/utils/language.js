import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState('hr');

	useEffect(() => {
		const retrieveLanguage = async () => {
			try {
				const storedLanguage = await AsyncStorage.getItem('language');
				if (storedLanguage) {
					setLanguage(storedLanguage);
				}
			} catch (error) {
				console.log('Error retrieving language from AsyncStorage:', error);
			}
		};
		retrieveLanguage();
	}, []);

	const updateLanguage = async (newLanguage) => {
		try {
			setLanguage(newLanguage);
			await AsyncStorage.setItem('language', newLanguage);
		} catch (error) {
			console.log('Error updating language in AsyncStorage:', error);
		}
	};

	return (
		<LanguageContext.Provider value={{ language, updateLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

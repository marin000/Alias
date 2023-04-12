import React, { useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { LanguageContext } from '../utils/language';
import { howToPlay } from '../constants';

export default function HowToPlay() {
	const { language } = useContext(LanguageContext);
	const { title, instructions } = howToPlay;
	return (
		<ImageBackground source={require('../assets/blurred-background.jpeg')} style={styles.container} resizeMode={'cover'}>
			<View>
				<Text style={styles.title}>{title[language]}</Text>
				<Card>
					<Text style={styles.instructions}>{instructions[language]}</Text>
				</Card>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
		marginTop: 10,
		color: 'white'
	},
	instructions: {
		fontSize: 18
	}
});
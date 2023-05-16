import React, { useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { howToPlay } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';

export default function HowToPlay() {
	const { language } = useContext(SettingsContext);
	const { title, instructions } = howToPlay;
	return (
		<ImageBackground source={backgroundImage} style={styles.container} resizeMode={'cover'}>
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
		flex: 1,
		padding: 20
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
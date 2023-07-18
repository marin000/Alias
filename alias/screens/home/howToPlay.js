import React, { useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { howToPlay } from '../../constants';
import { globalStyles } from '../../styles/global';
import backgroundImage from '../../assets/blurred-background.jpeg';

export default function HowToPlay() {
	const { language } = useContext(SettingsContext);
	const { title, instructions } = howToPlay;
	return (
		<ImageBackground source={backgroundImage} style={globalStyles.mainContainer} resizeMode={'cover'}>
			<View>
				<Text style={globalStyles.screenTitle}>{title[language]}</Text>
				<Card>
					<Text style={styles.instructions}>{instructions[language]}</Text>
				</Card>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	instructions: {
		fontSize: 18
	}
});

HowToPlay.navigationOptions = {
	headerShown: false,
};
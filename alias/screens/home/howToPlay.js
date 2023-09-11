import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { howToPlay } from '../../constants/howToPlayScreen';
import { globalStyles } from '../../styles/global';
import BackButton from '../../components/backButton';

export default function HowToPlay({ navigation }) {
	const { language } = useContext(SettingsContext);
	const { title, instructions } = howToPlay;
	return (
		<View style={globalStyles.mainContainer} resizeMode={'cover'}>
			<View>
				<BackButton onPress={() => navigation.goBack()} />
				<Text style={globalStyles.screenTitle}>{title[language]}</Text>
				<Card>
					<Text style={styles.instructions}>{instructions[language]}</Text>
				</Card>
			</View>
		</View>
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
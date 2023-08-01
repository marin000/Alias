import React, { useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Card } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SettingsContext } from '../../utils/settings';
import { howToPlay } from '../../constants';
import { globalStyles } from '../../styles/global';
import backgroundImage from '../../assets/blurred-background.jpeg';
import BackButton from '../../components/backButton';

export default function HowToPlay({ navigation }) {
	const { language } = useContext(SettingsContext);
	const { title, instructions } = howToPlay;
	return (
		<ImageBackground source={backgroundImage} style={globalStyles.mainContainer} resizeMode={'cover'}>
			<View>
				<BackButton onPress={() => navigation.goBack()} />
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
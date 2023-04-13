import React, { useContext } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { LanguageContext } from '../utils/language';
import { home } from '../constants';

export default function Home({ navigation }) {
	const { language } = useContext(LanguageContext);
	const { newGame, instructions, login } = home;

	const pressHandler = () => {
		navigation.navigate('HowToPlay');
	}

	return (
		<ImageBackground source={require('../assets/blurred-background.jpeg')} style={styles.container} resizeMode={'cover'}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Alias</Text>
			</View>
			<View style={styles.options}>
				<View style={styles.button}>
					<Button
						title={newGame[language]}
						color='#0000cc'
					/>
				</View>
				<View style={styles.button}>
					<Button
						title={instructions[language]}
						color='#0000cc'
						onPress={pressHandler}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title={login[language]}
						color='#0000cc'
					/>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40
	},
	header: {
		flex: 1
	},
	headerText: {
		fontSize: 100,
		marginTop: 30,
		color: 'yellow',
	},
	options: {
		flex: 1,
		justifyContent: 'center'
	},
	button: {
		marginTop: 20
	}
});

Home.navigationOptions = {
  headerShown: false,
};
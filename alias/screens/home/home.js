import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { deleteAllTeams, gameStartEnd } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { home } from '../../constants';
import backgroundImage from '../../assets/blurred-background.jpeg';

const Home = ({ teams, navigation }) => {
	const { language } = useContext(SettingsContext);
	const { newGame, continueGame, instructions, settings, login } = home;
	const dispatch = useDispatch();

	const pressHandler = (screen, option) => {
		if (option === 'continue') {
			navigation.navigate(screen, { language });
		} else {
			dispatch(deleteAllTeams());
			dispatch(gameStartEnd(false));
			navigation.navigate(screen, { language });
		}
	}

	return (
		<ImageBackground source={backgroundImage} style={styles.container} resizeMode={'cover'}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Alias</Text>
			</View>
			<View style={styles.options}>
				{
					teams.length > 0 &&
					<View style={styles.button}>
						<Button
							title={continueGame[language]}
							color='#0000cc'
							onPress={() => pressHandler('NewGame', 'continue')}
						/>
					</View>
				}
				<View style={styles.button}>
					<Button
						title={newGame[language]}
						color='#0000cc'
						onPress={() => pressHandler('NewGame', 'new')}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title={instructions[language]}
						color='#0000cc'
						onPress={() => pressHandler('HowToPlay')}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title={settings[language]}
						color='#0000cc'
						onPress={() => pressHandler('Settings')}
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

const mapStateToProps = (state) => ({
	teams: state.teamReducer.teams
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllTeams: () => dispatch(deleteAllTeams()),
    gameStartEnd: () => dispatch(gameStartEnd(false))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
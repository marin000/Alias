import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteAllTeams, gameStartEnd, updateMaxScoreReached, updateTeamIndex, updateUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { getToken } from '../../utils/auth';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { home } from '../../constants/homeScreen';
import backgroundImage from '../../assets/blurred-background.jpeg';
import api from '../../api/players';

const Home = ({ teams, userData, navigation }) => {
	const { language } = useContext(SettingsContext);
	const { newGame, continueGame, instructions, settings, login, profile } = home;
	const dispatch = useDispatch();

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await getToken('auth_token');
				if (token && !userData) {
					const header = {
						headers: {
							'Authorization': token
						}
					};
					api.getPlayerByToken(header)
						.then((res) => {
							dispatch(updateUser(res.data));
						})
						.catch((err) => {
							console.log(err.response.data);
						});
				}
			} catch (error) {
				console.log(error);
			}
		};
		checkToken();
	}, []);

	const handleNewGame = () => {
		dispatch(deleteAllTeams());
		dispatch(gameStartEnd(false));
		dispatch(updateMaxScoreReached(false));
		dispatch(updateTeamIndex(0));
		navigation.navigate('NewGame', { language });
	};

	const handleContinueGame = () => {
		navigation.navigate('NewGame', { language });
	};

	const handleSettings = () => {
		navigation.navigate('Settings');
	};

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
							onPress={handleContinueGame}
						/>
					</View>
				}
				<View style={styles.button}>
					<Button
						title={newGame[language]}
						color='#0000cc'
						onPress={handleNewGame}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title={instructions[language]}
						color='#0000cc'
						onPress={() => navigation.navigate('HowToPlay')}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title={settings[language]}
						color='#0000cc'
						onPress={handleSettings}
					/>
				</View>
				<View style={styles.button}>
					{userData ?
						<Button
							title={profile[language]}
							color='#0000cc'
							onPress={() => navigation.navigate('Profile')}
						/> :
						<Button
							title={login[language]}
							color='#0000cc'
							onPress={() => navigation.navigate('Login')}
						/>
					}
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
	teams: state.teamReducer.teams,
	userData: state.userReducer.userData
});

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAllTeams: () => dispatch(deleteAllTeams()),
		gameStartEnd: () => dispatch(gameStartEnd(false)),
		updateMaxScoreReached: () => dispatch(updateMaxScoreReached(false)),
		updateTeamIndex: () => dispatch(updateTeamIndex(index)),
		updateUser: (user) => dispatch(updateUser(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
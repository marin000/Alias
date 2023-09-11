import React, { useContext, useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { deleteAllTeams, gameStartEnd, updateMaxScoreReached, updateTeamIndex, updateUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { getToken } from '../../utils/auth';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { home } from '../../constants/homeScreen';
import homeIcon from '../../assets/homeIcon.png';
import api from '../../api/players';
import { globalStyles } from '../../styles/global';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Home = ({ teams, userData, navigation }) => {
	const { language } = useContext(SettingsContext);
	const { newGame, continueGame, instructions, settings, login, profile, statistics } = home;
	const [loading, setLoading] = useState(true);
	const [isLoaded] = useFonts({
		"luckiestGuy-regular": require("../../assets/fonts/LuckiestGuy-Regular.ttf")
	});
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
							setLoading(false);
						})
						.catch((err) => {
							console.log(err.response.data);
						});
				} else {
					setLoading(false);
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

	const handleOnLayout = useCallback(async () => {
		if (isLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [isLoaded]);

	if (!isLoaded) {
		return null;
	}

	return (
		<View style={styles.container} resizeMode={'cover'} onLayout={handleOnLayout}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Alias</Text>
				<Image
					source={homeIcon}
					style={styles.homeImg}
					resizeMode='cover'
				/>
			</View>
			{loading ?
				(
					<View style={styles.loadingContainer}>
						<ActivityIndicator size={80} color="#0000ff" />
					</View>
				) : (
					<View style={styles.options}>
						{
							teams.length > 0 &&
							<View style={styles.buttonContainer}>
								<Button
									title={continueGame[language]}
									onPress={handleContinueGame}
									buttonStyle={globalStyles.roundButton}
								/>
							</View>
						}
						<View style={styles.buttonContainer}>
							<Button
								title={newGame[language]}
								onPress={handleNewGame}
								buttonStyle={globalStyles.roundButton}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								title={instructions[language]}
								onPress={() => navigation.navigate('HowToPlay')}
								buttonStyle={globalStyles.roundButton}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								title={settings[language]}
								onPress={handleSettings}
								buttonStyle={globalStyles.roundButton}
							/>
						</View>
						<View style={styles.buttonContainer}>
							{userData ?
								<Button
									title={profile[language]}
									onPress={() => navigation.navigate('Profile')}
									buttonStyle={globalStyles.roundButton}
								/> :
								<Button
									title={login[language]}
									onPress={() => navigation.navigate('Login')}
									buttonStyle={globalStyles.roundButton}
								/>
							}
						</View>
						<View style={styles.buttonContainer}>
							{userData ?
								<Button
									title={statistics[language]}
									onPress={() => navigation.navigate('Statistics')}
									buttonStyle={globalStyles.roundButton}
								/> : null
							}
						</View>
						<View style={styles.banner}>
							<BannerAd
								unitId={TestIds.BANNER}
								size={BannerAdSize.FULL_BANNER}
								requestOptions={{
									requestNonPersonalizedAdsOnly: true,
								}}
							/>
						</View>
					</View>
				)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...globalStyles.mainContainer,
		padding: 40
	},
	header: {
		flex: 1,
		alignItems: 'center'
	},
	headerText: {
		fontSize: 100,
		marginTop: 30,
		color: 'black',
		fontFamily: 'luckiestGuy-regular',
		textShadowColor: 'rgba(255, 255, 255, 0.75)',
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 10,
		opacity: 0.9
	},
	options: {
		flex: 1,
		justifyContent: 'center',
		bottom: 35
	},
	buttonContainer: {
		marginTop: 15
	},
	loadingContainer: {
		...globalStyles.loadingContainer,
		marginTop: '-100%'
	},
	banner: {
		position: 'absolute',
		bottom: -70,
		alignSelf: 'center'
	},
	homeImg: {
		height: '33%',
		width: '45%',
		marginTop: 15
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
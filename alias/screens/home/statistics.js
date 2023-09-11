import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Text } from '@rneui/themed';
import { SettingsContext } from '../../utils/settings';
import { statistics } from '../../constants/statisticsScreen';
import { globalStyles } from '../../styles/global';
import BackButton from '../../components/backButton';
import apiResults from '../../api/results';
import TeamResult from '../../components/statisticsScreen.js/teamResult';
import PlayersResultDialog from '../../components/statisticsScreen.js/playersResultDialog';
import moment from 'moment';
import 'moment-timezone';
import _ from 'lodash';


const CustomCard = ({ children, style }) => {
	return (
		<View style={[styles.card, style]}>
			{children}
		</View>
	);
};

const Statistics = ({ userData, navigation }) => {
	const { language } = useContext(SettingsContext);
	const { title, noResults } = statistics;
	const [results, setResults] = useState([]);
	const [playersData, setPlayerData] = useState(null);
	const [dialog, setDialog] = useState(false);
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		apiResults.getResults(userData._id)
			.then((res) => {
				const sortedResults = _.sortBy(res.data, 'updatedAt').reverse();
				setResults(sortedResults);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleOpenDialog = (data) => {
		setPlayerData(data);
		setDialog(true);
	};

	const handleCloseDialog = () => {
		setDialog(false);
		setPlayerData(null);
	};

	return (
		<View style={globalStyles.mainContainer} resizeMode={'cover'}>
			<View>
				<BackButton onPress={() => navigation.goBack()} />
				<Text style={globalStyles.screenTitle}>{title[language]}</Text>
				{loading ? (
					<View style={globalStyles.loadingContainer}>
						<ActivityIndicator size={80} color="#0000ff" />
					</View>
				) : results.length > 0 ? (
					<View style={styles.resultContainer}>
						<FlatList
							data={results}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<TouchableHighlight onPress={() => handleOpenDialog(item)} underlayColor="transparent" >
									<CustomCard>
										<Text style={styles.dateText}>{moment(item.updatedAt).tz(userTimeZone).format('DD-MM-YYYY')}</Text>
										<FlatList
											data={item.teamResults}
											keyExtractor={(teamItem, index) => index.toString()}
											renderItem={({ item: teamItem }) => (
												<TeamResult resultItem={item} teamItem={teamItem} userData={userData} />
											)}
										/>
									</CustomCard>
								</TouchableHighlight>
							)}
						/>
						{playersData &&
							<PlayersResultDialog
								isVisible={dialog}
								onClose={handleCloseDialog}
								data={playersData}
								language={language}
							/>
						}
					</View>
				) : (
					<View style={styles.noResultsContainer}>
						<Text style={styles.noResults}>{noResults[language]}</Text>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	resultContainer: {
		marginTop: 30,
		marginBottom: 110
	},
	card: {
		backgroundColor: 'white',
		borderRadius: 15,
		elevation: 5,
		padding: 10,
		marginBottom: 20
	},
	noResultsContainer: {
		alignItems: 'center'
	},
	noResults: {
		color: 'white',
		fontSize: 20,
		marginTop: 30
	},
	dateText: {
		marginLeft: 43,
		marginBottom: 10,
		color: '#a6a6a6',
		fontSize: 13
	}
});

Statistics.navigationOptions = {
	headerShown: false,
};

const mapStateToProps = (state) => ({
	userData: state.userReducer.userData
});

export default connect(mapStateToProps, null)(Statistics);
import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import NewGame from '../screens/game/newGame';
import PlayGame from '../screens/game/playGame';
import { newGame } from '../constants';

const CustomHeader = ({headerTitle}) => {
	return (
		<View style={{ backgroundColor: 'transparent' }}>
			<Text>{headerTitle}</Text>
		</View>
	);
};

const EmptyCustomHeader = () => {
	return (
		<View style={{ backgroundColor: 'transparent' }}>
			{/* Empty view */}
		</View>
	);
};

const screens = {
  NewGame: {
    screen: NewGame,
    navigationOptions: ({ navigation }) => {
      const language = navigation.getParam('language', 'hr');
      const { headerTitle } = newGame;
      return {
        headerTitle: () => <CustomHeader headerTitle={headerTitle[language]} />,
      };
    },
  },
  PlayGame: {
		screen: PlayGame,
		navigationOptions: {
			headerLeft: () => null,
			headerTitle: () => <EmptyCustomHeader />
		}
	},
};

const GameStack = createStackNavigator(screens);

GameStack.navigationOptions = {
	headerShown: false,
};

export default GameStack;
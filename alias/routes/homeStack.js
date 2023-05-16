import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home/home";
import HowToPlay from '../screens/home/howToPlay';
import Settings from '../screens/home/settings';

const CustomHeader = () => {
	return (
		<View style={{ backgroundColor: 'transparent' }}>
			{/* Empty view */}
		</View>
	);
};

const screens = {
	Home: {
		screen: Home
	},
	HowToPlay: {
		screen: HowToPlay,
		navigationOptions: {
			headerTitle: () => <CustomHeader />
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			headerTitle: () => <CustomHeader />
		}
	}
};

const HomeStack = createStackNavigator(screens);

HomeStack.navigationOptions = {
	headerShown: false,
};

export default HomeStack;
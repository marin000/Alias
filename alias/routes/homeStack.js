import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import Home from "../screens/home/home";
import HowToPlay from '../screens/home/howToPlay';
import ChooseLang from '../screens/home/chooseLang';

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
	ChooseLang: {
		screen: ChooseLang,
		navigationOptions: {
			headerTitle: () => <CustomHeader />
		}
	}
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
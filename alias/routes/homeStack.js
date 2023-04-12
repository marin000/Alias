import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import HowToPlay from '../screens/howToPlay';

const CustomHeader = () => {
	return (
	  <View style={{backgroundColor: 'transparent'}}>
		{/* Empty view */}
	  </View>
	);
  };

const screens = {
	Home: {
		screen: Home,
		navigationOptions: {
			headerTitle: () => <CustomHeader />
		}
	},
	HowToPlay: {
		screen: HowToPlay,
		navigationOptions: {
			headerTitle: () => <CustomHeader />
		}
	}
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
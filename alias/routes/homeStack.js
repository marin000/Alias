import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home/home";
import HowToPlay from '../screens/home/howToPlay';
import Settings from '../screens/home/settings';
import Profile from '../screens/home/profile';
import Statistics from '../screens/home/statistics';

const screens = {
	Home: {
		screen: Home
	},
	HowToPlay: {
		screen: HowToPlay
	},
	Settings: {
		screen: Settings
	},
	Profile: {
		screen: Profile
	},
	Statistics: {
		screen: Statistics
	}
};

const HomeStack = createStackNavigator(screens);

HomeStack.navigationOptions = {
	headerShown: false,
};

export default HomeStack;
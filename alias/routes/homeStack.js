import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home/home";
import HowToPlay from '../screens/home/howToPlay';
import Settings from '../screens/home/settings';
import Profile from '../screens/home/profile';

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
	}
};

const HomeStack = createStackNavigator(screens);

HomeStack.navigationOptions = {
	headerShown: false,
};

export default HomeStack;
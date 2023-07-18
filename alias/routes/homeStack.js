import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home/home";
import HowToPlay from '../screens/home/howToPlay';
import Login from '../screens/home/login';
import Settings from '../screens/home/settings';

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
	Login: {
		screen: Login
	}
};

const HomeStack = createStackNavigator(screens);

HomeStack.navigationOptions = {
	headerShown: false,
};

export default HomeStack;
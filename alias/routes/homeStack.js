import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home/home";
import HowToPlay from '../screens/home/howToPlay';
import Login from '../screens/home/login';
import Settings from '../screens/home/settings';
import Register from '../screens/home/register';
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
	Login: {
		screen: Login
	},
	Register: {
		screen: Register
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
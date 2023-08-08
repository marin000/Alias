import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/home/home";
import HowToPlay from '../screens/home/howToPlay';
import Login from '../screens/home/login';
import Settings from '../screens/home/settings';
import Register from '../screens/home/register';
import Profile from '../screens/home/profile';
import ChangePassword from '../screens/home/changePassword';

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
	},
	ChangePassword: {
		screen: ChangePassword
	}
};

const HomeStack = createStackNavigator(screens);

HomeStack.navigationOptions = {
	headerShown: false,
};

export default HomeStack;
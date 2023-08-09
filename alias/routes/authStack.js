import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import ChangePassword from '../screens/auth/changePassword';

const screens = {
	Login: {
		screen: Login
	},
	Register: {
		screen: Register
	},
	ChangePassword: {
		screen: ChangePassword
	}
};

const AuthStack = createStackNavigator(screens);

AuthStack.navigationOptions = {
	headerShown: false,
};

export default AuthStack;
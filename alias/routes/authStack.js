import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import ChangePassword from '../screens/auth/changePassword';
import ForgotPassword from '../screens/auth/forgotPassword';

const screens = {
	Login: {
		screen: Login
	},
	Register: {
		screen: Register
	},
	ChangePassword: {
		screen: ChangePassword
	},
	ForgotPassword: {
		screen: ForgotPassword
	}
};

const AuthStack = createStackNavigator(screens);

AuthStack.navigationOptions = {
	headerShown: false,
};

export default AuthStack;
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import ChangePassword from '../screens/auth/changePassword';
import ForgotPassword from '../screens/auth/forgotPassword';
import ResetPassword from '../screens/auth/resetPassword';
import EnterPin from '../screens/auth/enterPin';

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
	},
	ResetPassword: {
		screen: ResetPassword
	},
	EnterPin: {
		screen: EnterPin
	}
};

const AuthStack = createStackNavigator(screens);

AuthStack.navigationOptions = {
	headerShown: false,
};

export default AuthStack;
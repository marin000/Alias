import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeStack from './homeStack';
import GameStack from './gameStack';
import AuthStack from './authStack';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      HomeStack, 
      GameStack,
      AuthStack
    },
    {
      initialRouteName: 'HomeStack'
    }
  )
);

export default AppNavigator;
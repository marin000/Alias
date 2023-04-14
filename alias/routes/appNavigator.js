import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeStack from './homeStack';
import GameStack from './gameStack';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      HomeStack, 
      GameStack
    },
    {
      initialRouteName: 'HomeStack'
    }
  )
);

export default AppNavigator;
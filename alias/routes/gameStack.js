import { createStackNavigator } from 'react-navigation-stack';
import NewGame from '../screens/game/newGame';
import PlayGame from '../screens/game/playGame';

const screens = {
  NewGame: {
    screen: NewGame,
  },
  PlayGame: {
		screen: PlayGame
	},
};

const GameStack = createStackNavigator(screens);

GameStack.navigationOptions = {
	headerShown: false,
};

export default GameStack;
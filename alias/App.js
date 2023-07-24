import AppNavigator from './routes/appNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SettingsProvider } from './utils/settings';
import { ThemeProvider, createTheme } from '@rneui/themed';
import store from './redux/store';
import { Provider } from 'react-redux';

const theme = createTheme({
	components: {
		colors: {
			primary: 'blue',
		},
	},
});

export default function App() {
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<SettingsProvider>
					<ThemeProvider theme={theme}>
						<AppNavigator />
					</ThemeProvider>
				</SettingsProvider>
			</Provider>
		</SafeAreaProvider>
	);
}
import AppNavigator from './routes/appNavigator';
import { SettingsProvider } from './utils/settings';
import { ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({
	components: {
		colors: {
			primary: 'blue',
		},
	},
});

export default function App() {
	return (
		<SettingsProvider>
			<ThemeProvider theme={theme}>
				<AppNavigator />
			</ThemeProvider>
		</SettingsProvider>
	);
}
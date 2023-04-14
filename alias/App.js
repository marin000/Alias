import AppNavigator from './routes/appNavigator';
import { LanguageProvider } from './utils/language';
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
		<LanguageProvider>
			<ThemeProvider theme={theme}>
				<AppNavigator />
			</ThemeProvider>
		</LanguageProvider>
	);
}
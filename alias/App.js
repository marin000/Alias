import { StyleSheet } from 'react-native';
import Navigator from './routes/homeStack';
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
				<Navigator />
			</ThemeProvider>
		</LanguageProvider>
	);
}
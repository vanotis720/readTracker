import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import GlobalStyles from './src/theme/GlobalStyles';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './src/navigations/HomeStack';


export default function App() {

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	async function authentification() {
		const result = await LocalAuthentication.authenticateAsync();
		setIsAuthenticated(result.success);
	}

	useEffect(() => {
		authentification();
	}, []);

	if (isAuthenticated) {
		return (
			<NavigationContainer>
				<HomeStack />
			</NavigationContainer>
		);
	}
	else {
		return (
			<View style={[styles.container, GlobalStyles.AndroidSafeArea]}>
				<View style={styles.notAccessView}>
					<Image source={require('./assets/icon/undraw_access_denied.png')} style={styles.notAccessImage} />
					<Text style={styles.notAccessText}>Vous n'avez pas accès à ces données, êtes-vous pirate ?</Text>
					<TouchableOpacity
						style={styles.notAccessAction}
						onPress={() => authentification()}
					>
						<Text style={styles.notAccessActionText}>Réessayer</Text>
					</TouchableOpacity>
				</View>
				<StatusBar style='auto' />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	notAccessView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	notAccessImage: {
		resizeMode: 'contain',
		width: 400,
		height: 400
	},
	notAccessText: {
		fontSize: 20,
		textAlign: 'center',
		marginVertical: 10,
		fontWeight: '500'

	},
	notAccessAction: {
		height: 50,
		marginTop: 15
	},
	notAccessActionText: {
		color: '#007AFF',
		fontSize: 15,
		fontWeight: '600'
	}
});

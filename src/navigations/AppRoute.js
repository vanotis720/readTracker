import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';

import AppBottom from './AppBottom';
import { ActivityIndicator } from 'react-native';
import colors from '../theme/colors';
import AuthStack from './AuthStack';
import { AuthContext } from '../providers/AuthProvider';
import SplashScreen from '../components/SplashScreen';


const AppRoute = () => {

    const { userInfo, splashLoading, setSplashLoading, setError, setLocation, setAddress } = useContext(AuthContext);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const timeout = setTimeout(() => setSplashLoading(false), 1000);
        const address = await Location.reverseGeocodeAsync(location.coords);
        setLocation(location);
        setAddress(address);
        return () => clearTimeout(timeout)
    };

    useEffect(() => {
        setSplashLoading(true);
        getLocation();
    }, []);

    return (
        <NavigationContainer>
            {splashLoading ? (
                <SplashScreen />
            ) : userInfo.access_token ? (
                <AppBottom />
            ) : <AuthStack />}
        </NavigationContainer>
    )
}
export default AppRoute

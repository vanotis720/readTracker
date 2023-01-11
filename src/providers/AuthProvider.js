import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { LOGIN, REGISTER, CONFIRM } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mustVerify, setMustVerify] = useState(false);
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState({});


    const register = (name, phone, password) => {
        setIsLoading(true);

        axios.post(REGISTER, {
            name,
            phone,
            password,
        })
            .then(res => {
                let userInfo = res.data;
                if (userInfo.status == "Success") {
                    setMustVerify(true);
                    setUserInfo(userInfo.results);
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.results));
                    console.log(userInfo.results);
                    setIsLoading(false);
                    setError(null);
                }
                else {
                    setError(userInfo.message);
                    setIsLoading(false);
                }
            })
            .catch(e => {
                setError(null);
                console.log(`login error ${e}`);
                console.log(e.response.status);
                if (e.response) {
                    if (e.response.status == 404) {
                        setError('We are having problems with our server, please try again later');
                    }
                    else if (e.response.status == 422) {
                        if (e.response.data.message.phone) {
                            setError(e.response.data.message.phone);
                        }
                        else if (e.response.data.message.name) {
                            setError(e.response.data.message.name)
                        }
                        else if (e.response.data.message.password) {
                            setError(e.response.data.message.password)
                        }
                    }
                    console.log(e.response.data.message);
                }
                setIsLoading(false);
            });
    };

    const confirm = (otp) => {
        setIsLoading(true);

        console.log('in confirm function inside provider');

        axios.post(CONFIRM, {
            otp,
        }, {
            headers: { Authorization: `Bearer ${userInfo.access_token}` }
        })
            .then(res => {
                setError(null);
                let userInfo = res.data;
                if (userInfo.status == "Success") {
                    console.log('============in confirm function then ========================');
                    console.log(userInfo.results);
                    console.log('====================================');
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.results));
                    setUserInfo(userInfo.results);
                    setIsLoading(false);
                }
            })
            .catch(e => {
                console.log('============in confirm function catch ========================');
                console.log(e);
                console.log('====================================');
                setError(null);
                if (e.response) {
                    if (e.response.status == 404) {
                        setError('We are having problems with our server, please try again later');
                    }
                    else if (e.response.status == 422) {
                        if (e.response.data.message.phone) {
                            setError(e.response.data.message.phone);
                        }
                        else if (e.response.data.message.otp) {
                            setError(e.response.data.message.otp)
                        }
                        else {
                            setError(e.response.data.message);
                        }
                    }
                    console.log(e.response.data.message);
                }
                setIsLoading(false);
            });
    };

    const login = (phone, password) => {
        setIsLoading(true);
        setError(null);

        console.log('====================================');
        console.log('login');
        console.log('====================================');

        axios.post(LOGIN, {
            phone,
            password,
        })
            .then(res => {
                let userInfo = res.data;
                if (userInfo.status == "Success") {
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.results));
                    setUserInfo(userInfo.results);
                    setIsLoading(false);
                    setError(null);
                }
            })
            .catch(e => {
                setError(null);
                if (e.response) {
                    if (e.response.status == 404) {
                        setError('We are having problems with our server, please try again later');
                    }
                    else if (e.response.status == 422) {
                        if (e.response.data.message.phone) {
                            setError(e.response.data.message.phone);
                        }
                        else {
                            setError(e.response.data.message.toString());
                        }
                    }
                    console.log(e.response.data.message);
                }
                setIsLoading(false);
            });
    };

    const logout = () => {
        setIsLoading(true);
        setUserInfo({});
        AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                console.log('=============user from provider effect=======================');
                console.log(userInfo);
                console.log('====================================');
                setUserInfo(userInfo);
            }
            setSplashLoading(false);
        } catch (e) {
            console.log(e);
            setSplashLoading(false);
        }
    };

    useEffect(() => {
        console.log('use effect provider');
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                splashLoading,
                error,
                mustVerify,
                location,
                address,
                register,
                login,
                logout,
                confirm,
                setError,
                setMustVerify,
                setIsLoading,
                setSplashLoading,
                setLocation,
                setAddress
            }}>
            {children}
        </AuthContext.Provider>
    );
};
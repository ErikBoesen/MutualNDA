import 'react-native-gesture-handler';

import { useState, useCallback, useEffect } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useLoadedAssets } from './hooks/useLoadedAssets';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme, SafeAreaView, StyleSheet } from 'react-native';

import store from './store';
import { Provider } from 'react-redux';

import IntroScreen from './screens/IntroScreen';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import LocationScreen from './screens/LocationScreen';
import ItemScreen from './screens/ItemScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';

import { isLoggedIn } from './services/auth';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

function App() {
    const isLoadingComplete = useLoadedAssets();

    const [fontsLoaded] = useFonts({
        'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
        'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
        'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
    });


    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        isLoggedIn().then((result) => {
            setLoggedIn(result);
        });
    });

    if (!fontsLoaded || !isLoadingComplete || loggedIn === null) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <StatusBar barStyle='default' />
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}>
                        {!loggedIn ? (
                            <Stack.Screen
                                name="Intro"
                                component={IntroScreen}
                                />
                        )
                        : null}
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            />
                        <Stack.Screen
                            name="Explore"
                            component={ExploreScreen}
                            />
                        <Stack.Screen
                            name="Location"
                            component={LocationScreen}
                            />
                        <Stack.Screen
                            name="Item"
                            component={ItemScreen}
                            />
                        <Stack.Screen
                            name="Reviews"
                            component={ReviewsScreen}
                            />
                        <Stack.Screen
                            name="Settings"
                            component={SettingsScreen}
                            />
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
  }
}

export default Sentry.wrap(App);

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});

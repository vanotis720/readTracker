import * as React from 'react';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from '../components/HomeScreen';
import colors from '../theme/colors';
import { useWindowDimensions } from 'react-native';
import AboutScreen from '../components/AboutScreen';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            {/* <DrawerItem
                label="Close drawer"
                onPress={() => props.navigation.closeDrawer()}
            />
            <DrawerItem
                label="Toggle drawer"
                onPress={() => props.navigation.toggleDrawer()}
            /> */}
            <AboutScreen />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function AppDrawer() {
    const dimensions = useWindowDimensions();

    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: colors.GRAY,
                    // width: 240,
                },
                drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
                // drawerHideStatusBarOnOpen: true
            }}
        >
            <Drawer.Screen name="notes" component={HomeScreen} options={{
                title: 'NOTES',
            }} />
        </Drawer.Navigator>
    );
}

export default AppDrawer;
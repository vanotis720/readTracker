import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import NoteScreen from '../components/NoteScreen';
import AppDrawer from './AppDrawer';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="DrawerNotes">
            <Stack.Screen
                name="DrawerNotes"
                component={AppDrawer}
                options={{
                    title: 'Liste des notes',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Note"
                component={NoteScreen}
                options={{
                    title: 'Détail de la note',
                    headerShown: true,

                }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
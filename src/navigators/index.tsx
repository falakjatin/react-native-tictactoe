import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/Home';
import MultiPlayerScreen from '../screens/MultiPlayer';
import MultiPlayerSingleDeviceScreen from '../screens/MultiPlayerSingleDevice';
import SinglePlayerScreen from '../screens/SinglePlayer';

const Stack = createStackNavigator<RootStackScreensParamList>();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Multiplayer" component={MultiPlayerScreen} />
                <Stack.Screen name="MultiplayerSingleDevice" component={MultiPlayerSingleDeviceScreen} />
                <Stack.Screen name="Singleplayer" component={SinglePlayerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack

export type RootStackScreensParamList = {
    Home: {} | undefined,
    Multiplayer: {} | undefined,
    MultiplayerSingleDevice: {} | undefined,
    Singleplayer: {} | undefined,
}
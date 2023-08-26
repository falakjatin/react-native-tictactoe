import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/Home';
import MultiPlayerScreen from '../screens/MultiPlayer';
import MultiPlayerSingleDeviceScreen from '../screens/MultiPlayerSingleDevice';
import SinglePlayerScreen from '../screens/SinglePlayer';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Multiplayer" component={MultiPlayerScreen} />
                <Stack.Screen name="MultiplayerSingleDevice" component={MultiPlayerSingleDeviceScreen} />
                <Stack.Screen name="Singleplayer" component={SinglePlayerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack

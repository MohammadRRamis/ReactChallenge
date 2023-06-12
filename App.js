import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import HomeScreenNavigator from './HomeScreenNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen  name='Login' component={Login} />
        <Stack.Screen name='HomeScreen' component={HomeScreenNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

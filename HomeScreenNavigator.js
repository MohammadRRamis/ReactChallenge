import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import StarredScreen from './screens/StarredScreen';
const Tab = createMaterialTopTabNavigator();

export default function HomeScreenNavigator() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Starred' component={StarredScreen} />
    </Tab.Navigator>
  );
}

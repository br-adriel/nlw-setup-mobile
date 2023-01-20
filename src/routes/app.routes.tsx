import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HabitScreen from '../screens/Habit';
import HomeScreen from '../screens/Home';
import NewScreen from '../screens/New';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={HomeScreen} />
      <Screen name='new' component={NewScreen} />
      <Screen name='habit' component={HabitScreen} />
    </Navigator>
  );
}

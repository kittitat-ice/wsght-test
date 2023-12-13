import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import SummaryScreen from '../screens/Summary';


const MainBottomTab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <MainBottomTab.Navigator>
      <MainBottomTab.Screen name="Home" component={HomeScreen} />
      <MainBottomTab.Screen name="Summary" component={SummaryScreen} />
    </MainBottomTab.Navigator>
  );
}

const Routes = () => {
  return (
    <NavigationContainer>
      {<MainTabs />}
    </NavigationContainer>
  );
};

export default Routes;

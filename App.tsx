import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import TripCreationScreen from './TripCreationScreen';
import CustomHeader from './CustomHeader'; // Import the custom header component
import TripDetailsScreen from './TripDetailsScreen';
import TripsListScreen from './TripsListsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: props => (
              <CustomHeader {...props} title="" showBackButton={false} />
            ), // Use the custom header component
          }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            header: props => (
              <CustomHeader {...props} title="" showBackButton={false} />
            ), // Use the custom header component
          }}
        />
        <Stack.Screen
          name="TripCreation"
          component={TripCreationScreen}
          options={{
            header: props => (
              <CustomHeader
                {...props}
                title="Trip Planner"
                showBackButton={false}
              />
            ), // Use the custom header component
          }} // You can set a title for other screens if needed
        />
        <Stack.Screen
          name="TripsList"
          component={TripsListScreen}
          options={{
            header: props => (
              <CustomHeader
                {...props}
                title="Trips List"
                showBackButton={true}
              />
            ), // Use the custom header component
          }} // You can set a title for other screens if needed
        />
        <Stack.Screen
          name="TripDetails"
          component={TripDetailsScreen}
          options={{
            header: props => (
              <CustomHeader
                {...props}
                title="Trip Details"
                showBackButton={true}
              />
            ), // Use the custom header component
          }} // You can set a title for other screens if needed
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

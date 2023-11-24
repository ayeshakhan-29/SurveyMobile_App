import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import SurveyPage from './src/pages/SurveyPage';
import Login from './src/pages/Login';
import SignupScreen from './src/pages/Signup';
// import ToastManager, { Toast } from 'toastify-react-native'
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

function App() {
  // Simulate user authentication (you should replace this with your actual authentication logic)
  const isAuthenticated = /* Check if the user is authenticated */ true;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignupPage">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen
          name="SurveyPage" 
          component={SurveyPage}
          // component={isAuthenticated ? SurveyScreen : LoginScreen}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignupPage" component={SignupScreen} />
        {/* <Stack.Screen name="ResultsPage" component={ResultsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import SurveyPage from './src/pages/SurveyPage';
import Login from './src/pages/Login';
import SignupScreen from './src/pages/Signup';
import FirstPage from './src/pages/FirstPage'
import LogoutScreen from './src/pages/Logout';
// import ToastManager, { Toast } from 'toastify-react-native'
import Toast from 'react-native-toast-message';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogoutScreen">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen
          name="SurveyPage" 
          component={SurveyPage}        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignupPage" component={SignupScreen} />
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Text,View } from "react-native";
import HomeScreen from "../Screen/HomeScreen";
import LoginScreen from "../Screen/LoginScreen";
import RegisterScreen from "../Screen/RegisterScreen";
import { Provider } from "react-redux";
import store from "./Store";
import AddContactScreen from "../Screen/AddContact";
import EditContactScreen from "../Screen/EditContact";


const Stack = createNativeStackNavigator();
const Navigation = ()=>{
    return (
        <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
            <Stack.Screen name="AddContact" component={AddContactScreen} />
            <Stack.Screen name="EditContact" component={EditContactScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>

    )
}

export default Navigation;

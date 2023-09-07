import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../components/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loginError = useSelector((state) => state.auth.loginError);

  const [loading, setLoading] = useState(false); // Loading state to disable the login button

  const handleLogin = async (values) => {
    // Create an object with the user's login data
    const email = values.email;
    const password = values.password;
    const userData = {
      email,
      password,
    };

    // Disable the login button to prevent multiple clicks
    setLoading(true);

    // Dispatch the loginUser action to check the credentials
    dispatch(loginUser(userData));

    // Check if login was successful or not
    if (isLoggedIn) {
      try {
        await AsyncStorage.setItem("isLoggedIn", "true");
        console.log("login success");
        navigation.navigate("Home");
        console.log(isLoggedIn);
      } catch (error) {
        console.error("error in login is", error);
      }
    } 
  };

  useEffect(() => {
    const gettoken = async () => {
      const value = await AsyncStorage.getItem("isLoggedIn");
      if (value === "true") {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    };
    gettoken();
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, handleSubmit }) => (
          <View style={styles.wrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry
            />

            <Button
              title="Login"
              onPress={handleSubmit}
               // Disable the button when 'loading' is true
            />

            <View style={styles.row}>
              <Text>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.replace("Register")}>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 200,
  },
  wrapper: {
    width: "100%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  label: {
    marginBottom: 4,
  },
  link: {
    color: "blue",
  },
});

export default LoginScreen;

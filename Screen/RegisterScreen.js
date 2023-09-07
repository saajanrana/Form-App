import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../components/AuthSlice"; 
import * as Yup from "yup";
import { Formik } from "formik";



const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Eneter your First Name"),
  lastname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Eneter your Last Name"),

  email: Yup.string()
    .email("Invalid email")
    .required("Please Eneter your Email"),

  password: Yup.string()
    .min(8, "Too Short!")
    .required("Please Eneter your Password")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Must Contain One Upercase,One Lowercase,One Number,and One Char"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Your Password Do not Match")
    .required("Confirm Password is required."),
});




function RegisterScreen({ navigation }) {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // const handleRegistration = () => {
  //   // Create an object with the user's registration data
  //   const userData = {
  //     username,
  //     email,
  //     password,
  //   };

  //   // Dispatch the registerUser action to register the user
  //   dispatch(registerUser(userData));

  //   // Navigate to the login page after successful registration
  //   navigation.navigate("Login");
  // };

  return (
    // <View style={styles.container}>
    //   <View style={styles.wrapper}>
    //     <Text style={styles.title}>Register</Text>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Username"
    //       value={username}
    //       onChangeText={(text) => setUsername(text)}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Email"
    //       value={email}
    //       onChangeText={(text) => setEmail(text)}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Password"
    //       value={password}
    //       onChangeText={(text) => setPassword(text)}
    //       secureTextEntry
    //     />
    //     <Button title="Register" onPress={handleRegistration} />
    //     <View style={styles.linkContainer}>
    //       <Text>Already have an account? </Text>
    //       <Text
    //         style={styles.link}
    //         onPress={() => navigation.navigate("Login")}
    //       >
    //         Login
    //       </Text>
    //     </View>
    //   </View>
    // </View>
    <Formik
    initialValues={{
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    }}
    validationSchema={SignupSchema}
    onSubmit={(values)=>{
      const firstname = values.firstname;
      const lastname = values.lastname;
      const email=values.email;
      const password=values.password;

      const userData = {
        firstname,
        lastname,
        email,
        password
      }

      console.log(userData);
      dispatch(registerUser(userData));
      navigation.navigate('Login');
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      setFieldTouched,
      isValid,
      handleSubmit,
    }) => (
      <View style={styles.container}>
        {/*input field start*/}
        <View>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            value={values.firstname}
            onChangeText={handleChange("firstname")}
            onBlur={() => setFieldTouched("firstname")}
          />
          {touched.firstname && errors.firstname && (
            <Text style={styles.error}>{errors.firstname}</Text>
          )}
        </View>
        <View>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={values.lastname}
            onChangeText={handleChange("lastname")}
            onBlur={() => setFieldTouched("lastname")}
          />
          {touched.lastname && errors.lastname && (
            <Text style={styles.error}>{errors.lastname}</Text>
          )}
        </View>

        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
          />
          {touched.email && errors.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}
        </View>
        <View>
          <Text style={styles.label}>PassWord</Text>
          <TextInput
            style={styles.input}
            placeholder="PassWord"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={() => setFieldTouched("password")}
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
        </View>
        <View>
          <Text style={styles.label}>Confirm PassWord</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm PassWord"
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={() => setFieldTouched("confirmPassword")}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}
        </View>
        <Button title="Submit" disabled={!isValid} onPress={handleSubmit} />
      </View>
    )}
  </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    paddingTop:200
  },
  wrapper: {
    width: "80%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
    height: 40,
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  link: {
    color: "blue",
  },
  error:{
    color:'red',
    fontSize:12,
    marginTop:4
  }
});

export default RegisterScreen;

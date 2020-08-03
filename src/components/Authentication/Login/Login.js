import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { accountAction } from "../../../redux";

function Login({ navigation, dispatch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const HandleCreateAccountButton = () => {
    navigation.navigate("Register");
  };

  const HandleForgetPasswordButton = () => {
    navigation.navigate("ForgetPassword");
  };

  const HandleLogin = async () => {
    if (email === "" || password === "") {
      return setStatus("Vui lòng nhập đủ thông tin cần thiết");
    }
    const login = await dispatch(accountAction.login({ email, password }));
    if (!login.status) {
      return setStatus(login.msg);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/image_background.jpg")}
        style={styles.imageBackground}
      >
        <Text style={styles.title}>E-LEARNING</Text>
        <View style={styles.form}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            Welcome back
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={setPassword}
          />
          <Text style={{ color: "blue" }}>{status}</Text>
          <TouchableOpacity onPress={HandleForgetPasswordButton}>
            <Text style={styles.textForgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={HandleLogin}>
            <Text style={styles.textInSignInButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={HandleCreateAccountButton}>
          <Text style={styles.textInfooter}>New here? Create an account</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 400,
    paddingTop: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  textInput: {
    fontSize: 15,
    margin: 5,
    height: 55,
    width: windowWidth - 20 * 2,
    backgroundColor: "#fff",
    paddingLeft: 10,
    borderColor: "black",
    borderWidth: 0.2,
    borderRadius: 30,
  },
  textForgotPassword: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textInSignInButton: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    margin: 20,
    height: 55,
    width: windowWidth - 20 * 2,
    backgroundColor: "skyblue",
    borderColor: "black",
    borderWidth: 0.2,
    borderRadius: 30,
  },
  textInfooter: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Login);

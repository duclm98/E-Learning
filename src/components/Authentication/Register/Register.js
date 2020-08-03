import React, { useState } from "react";
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

const Register = ({ navigation, dispatch }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const HandleGoBackLoginButton = () => {
    navigation.navigate("Login");
  };

  const HandleRegister = async () => {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      phone === ""
    ) {
      return setMsg("Vui lòng nhập đầy đủ thông tin cần thiết!");
    }
    if (password !== confirmPassword) {
      return setMsg("Mật khẩu không khớp!");
    }

    const createAccount = await dispatch(accountAction.createAccount(email, password, phone));
    if(!createAccount.status){
      return setMsg(createAccount.msg);
    }
    return setMsg('Vui lòng kiểm tra email để kích hoạt tài khoản');
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
            Create an account
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
            placeholder="Phone number"
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Text style={{ color: "blue" }}>{msg}</Text>
          <TouchableOpacity style={styles.button} onPress={HandleRegister}>
            <Text style={styles.textInSignInButton}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={HandleGoBackLoginButton}>
          <Text style={styles.textInfooter}>Have an account? Sign in</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

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

export default connect()(Register);

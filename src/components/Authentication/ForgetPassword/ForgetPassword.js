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

const ForgetPassword = ({ navigation, dispatch }) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const HandleGoBackLoginButton = () => {
    navigation.navigate("Login");
  };

  const HandleConfirmButton = () => {
    navigation.navigate("VerifyPassword");
  };

  const HandleForgetPassword = async () => {
    const forgetPassword = await dispatch(accountAction.forgetPassword(email));
    if (!forgetPassword.status) {
      setEmail("");
      return setMsg(forgetPassword.msg);
    }
    return setMsg("Vui lòng kiểm tra email để thay đổi mật khẩu");
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
            Reset password
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={{ color: "blue" }}>{msg}</Text>
          <TouchableOpacity
            onPress={HandleForgetPassword}
            style={styles.button}
          >
            <Text style={styles.textInSignInButton}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={HandleGoBackLoginButton}>
          <Text style={styles.textInfooter}>Back to login page</Text>
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

export default connect()(ForgetPassword);

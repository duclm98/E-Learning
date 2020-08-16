import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Avatar } from "react-native-elements";

import { accountAction } from "../../../redux";

const Account = ({ navigation, dispatch, accountFromState }) => {
  const [account, setAccount] = useState();

  const HandleLogin = () => {
    navigation.popToTop(null);
    navigation.navigate("Login");
  };

  useEffect(() => {
    setAccount(accountFromState);
  }, [accountFromState]);

  const HandleLogout = async () => {
    const logout = await dispatch(accountAction.logout());
    if (!logout.status) {
      return Alert.alert("Lỗi", logout.msg);
    }
  };

  return (
    <View style={styles.container}>
      {account ? (
        <View style={styles.container}>
          <View style={styles.common}>
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri: account.avatar,
              }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              containerStyle={{ marginTop: 10 }}
            />
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {account.name}
            </Text>
            <Text style={{ fontSize: 15 }}>{account.email}</Text>
          </View>
          <View style={{ ...styles.common, marginBottom: 10 }}>
            <TouchableOpacity
              style={{ paddingBottom: 30 }}
              onPress={HandleLogout}
            >
              <Text style={{ color: "blue", fontSize: 20, fontWeight: "bold" }}>
                Logout
              </Text>
            </TouchableOpacity>
            <Text>E-Learning v2.1.0</Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.common}>
            <Avatar
              size="xlarge"
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
              containerStyle={{ marginTop: 10 }}
            />
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>E-Learning</Text>
            <Text style={{ fontSize: 15 }}>Login now!</Text>
          </View>
          <View style={{ ...styles.common, marginBottom: 10 }}>
            <TouchableOpacity
              style={{ paddingBottom: 30 }}
              onPress={HandleLogin}
            >
              <Text style={{ color: "blue", fontSize: 20, fontWeight: "bold" }}>
                Login
              </Text>
            </TouchableOpacity>
            <Text>E-Learning v2.1.0</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#C6E2FF"
  },
  common: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    accountFromState: state.account,
  };
};

export default connect(mapStateToProps)(Account);

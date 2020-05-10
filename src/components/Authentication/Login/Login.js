import React from 'react'
import {Dimensions, StyleSheet, View, Text, TextInput, ImageBackground } from 'react-native'

function Login() {
    return <View style ={styles.container}>
        <ImageBackground source = {require('../../../../assets/image_background.jpg')} style = {styles.imageBackground}>
            <View style = {styles.loginForm}>
                <Text style = {styles.title}>Sign in</Text>
                <TextInput
                style = {styles.textInput}
                    placeholder = 'Email'
                    keyboardType = 'email-address'
                    underlineColorAndroid = 'transparent'
                />
                <TextInput
                style = {styles.textInput}
                    placeholder = 'Password'
                    keyboardType = 'unvisible-password'
                    underlineColorAndroid = 'transparent'
                />
            </View>
        </ImageBackground>
    </View>
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 40,
        fontWeight: "bold"
    },
    textInput: {
        fontSize: 15,
        margin: 20,
        height: 60,
        width: windowWidth - 20 *2,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 0.2,
    }
})

export default Login
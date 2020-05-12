import React from 'react'
import {Dimensions, StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native'

const Register = () => {
    return <View style ={styles.container}>
        <ImageBackground source = {require('../../../../assets/image_background.jpg')} style = {styles.imageBackground}>
            <Text style = {styles.title}>E-LEARNING</Text>
            <View style = {styles.loginForm}>
                <Text style = {{color: 'white', fontSize: 30, fontWeight: 'bold'}}>Create an account</Text>
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
                    secureTextEntry = {true}
                    underlineColorAndroid = 'transparent'
                />
                <TextInput
                style = {styles.textInput}
                    placeholder = 'Confirm Password'
                    keyboardType = 'unvisible-password'
                    secureTextEntry = {true}
                    underlineColorAndroid = 'transparent'
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textInSignInButton}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Text style={styles.textInfooter}>Have an account? Sign in</Text>
            </TouchableOpacity>
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
        justifyContent: 'space-around',
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
        fontWeight: "bold",
        color: 'white',
    },
    textInput: {
        fontSize: 15,
        margin: 5,
        height: 55,
        width: windowWidth - 20 *2,
        backgroundColor: '#fff',
        paddingLeft: 10,
        borderColor: 'black',
        borderWidth: 0.2,
        borderRadius: 30,
    },
    textForgotPassword: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textInSignInButton: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        margin: 20,
        height: 55,
        width: windowWidth - 20 *2,
        backgroundColor: 'skyblue',
        borderColor: 'black',
        borderWidth: 0.2,
        borderRadius: 30,
    },
    textInfooter: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
})

export default Register
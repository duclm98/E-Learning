import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity} from 'react-native';
import { MainContext } from '../../../../App';
import { login } from '../../../core/Services/AuthenticationServices';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responsesLogin, setResponsesLogin] = useState(null);
    const [errStr, setErrStr] = useState('');

    const HandleCreateAccountButton = () =>{
        props.navigation.navigate('Register');
    }

    const HandleForgetPasswordButton = () =>{
        props.navigation.navigate('ForgetPassword');
    }

    const {
        setAccount
    } = useContext(MainContext);

    useEffect(() => {
        if(responsesLogin){
            if(responsesLogin.status === 200){
                const account = responsesLogin.account;
                setAccount(account);
            } else {
                setErrStr(responsesLogin.errStr);
            }
        }
    }, [responsesLogin]);

    return <View style ={styles.container}>
        <ImageBackground source = {require('../../../../assets/image_background.jpg')} style = {styles.imageBackground}>
            <Text style = {styles.title}>E-LEARNING</Text>
            <View style = {styles.form}>
                <Text style = {{color: 'white', fontSize: 30, fontWeight: 'bold'}}>Welcome back</Text>
                <TextInput
                    style = {styles.textInput}
                    placeholder = 'Email'
                    keyboardType = 'email-address'
                    underlineColorAndroid = 'transparent'
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                style = {styles.textInput}
                    placeholder = 'Password'
                    secureTextEntry = {true}
                    underlineColorAndroid = 'transparent'
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style = {{color: 'blue'}}>{errStr}</Text>
                <TouchableOpacity onPress={HandleForgetPasswordButton}>
                    <Text style={styles.textForgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {setResponsesLogin(login(username, password))}}>
                    <Text style={styles.textInSignInButton}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={HandleCreateAccountButton}>
                <Text style={styles.textInfooter}>New here? Create an account</Text>
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
        alignItems: "center",
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "center",
        height: 400,
        paddingTop: 30
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

export default Login
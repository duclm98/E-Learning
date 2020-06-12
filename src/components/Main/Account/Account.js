import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements';
import { MainContext } from '../../../../App';

const Account = (props) => {
    const HandleLogin = () =>{
        // const backAction = NavigationActions.back({
        //     key: null
        // })
        props.navigation.popToTop(null);
        props.navigation.navigate('Login');
    }

    return <MainContext.Consumer>
        {
            ({accountToken, setAccountToken}) => {
                if(accountToken){
                    const account = JSON.parse(accountToken);

                    return <View style = {styles.container}>
                        <View style = {styles.common}>
                            <Avatar size = 'xlarge'
                            rounded
                            source = {{
                                uri: account.url_avatar ,
                            }}
                            onPress = {
                                () => console.log("Works!")
                            }
                            activeOpacity = { 0.7 }
                            containerStyle={{marginTop: 10}}
                            />
                            <Text style = {{fontSize: 25, fontWeight: 'bold'}}>{account.fullname}</Text>
                            <Text style = {{fontSize: 15}}>{account.username}</Text>
                        </View>
                        <View style = {{...styles.common, marginBottom: 10}}>
                            <TouchableOpacity style = {{paddingBottom: 30}} onPress={() => {setAccountToken()}}>
                                <Text style={{color: 'blue', fontSize: 20, fontWeight: 'bold'}}>Logout</Text>
                            </TouchableOpacity>
                            <Text>E-Learning v2.1.0</Text>
                        </View>
                    </View>
                } else {
                    return <View style = {styles.container}>
                        <View style = {styles.common}>
                            <Avatar size = 'xlarge'
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            onPress = {
                                () => console.log("Works!")
                            }
                            activeOpacity = { 0.7 }
                            containerStyle={{marginTop: 10}}
                            />
                            <Text style = {{fontSize: 25, fontWeight: 'bold'}}>E-Learning</Text>
                            <Text style = {{fontSize: 15}}>Login now!</Text>
                        </View>
                        <View style = {{...styles.common, marginBottom: 10}}>
                            <TouchableOpacity style = {{paddingBottom: 30}} onPress={HandleLogin}>
                                <Text style={{color: 'blue', fontSize: 20, fontWeight: 'bold'}}>Login</Text>
                            </TouchableOpacity>
                            <Text>E-Learning v2.1.0</Text>
                        </View>
                    </View>
                }
            }
        }
    </MainContext.Consumer>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    common: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default Account
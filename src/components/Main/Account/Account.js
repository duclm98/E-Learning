import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements';
import { context } from '../../../../App';

const Account = (props) => {
    const {
        signOut
    } = useContext(context).authContext;

    const account = useContext(context).account;

    if (account !== undefined) {
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
                <Text style = {{fontSize: 30, fontWeight: 'bold'}}>{account.fullname}</Text>
                <Text style = {{fontSize: 20}}>{account.username}</Text>
            </View>
            <View style = {{...styles.common, marginBottom: 10}}>
                <TouchableOpacity style = {{paddingBottom: 30}} onPress={() => signOut({})}>
                    <Text style={{color: 'blue', fontSize: 20, fontWeight: 'bold'}}>Logout</Text>
                </TouchableOpacity>
                <Text>E-Learning v2.1.0</Text>
            </View>
        </View>
    } else{
        return <View style = {styles.container}>

        </View>
    }
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
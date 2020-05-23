import React from 'react'
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native'

const ListCoursesItem = (props) => {
    const onPressItem = () => {
        Alert.alert('Info',
            'Item is pressed',
            [{
                    text: 'Ask me later',
                    onPress: () => console.log('Ask me later pressed')
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                }
            ], {
                cancelable: true
            });
    };

    return <TouchableOpacity style = {styles.item} onPress={onPressItem}>
        <Image source = {require('../../../../assets/icon_course.png')} style = {styles.image}></Image>
        <View>
            <Text style = {styles.title}>{props.item.title}</Text>
            <Text style = {styles.text}>{props.item.author}</Text>
            <Text style = {styles.text}>{props.item.level} - {props.item.released} - {props.item.duration}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    image: {
        margin: 5,
        width: 120,
        height: 100,
        resizeMode: 'stretch',
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        fontSize: 15
    }
})

export default ListCoursesItem
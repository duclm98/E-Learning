import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

function SectionCourserItem(props) {
    return <View style = {styles.item}>
        <Image source = {require('../../../../../assets/icon_course.png')} style = {styles.image}></Image>
        <View>
            <Text style = {styles.title}>{props.item.title}</Text>
            <Text style = {styles.text}>{props.item.author}</Text>
            <Text style = {styles.text}>{props.item.level} - {props.item.released} - {props.item.duration}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    item: {
        margin: 5,
        width: 230,
        height: 230,
    },
    image: {
        resizeMode: "cover",
        width: 230,
        height: 150,
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        fontSize: 15
    }
})

export default SectionCourserItem
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'

const ImageButton = (props) => {
    return <ImageBackground style={styles.imageBackground} source={require('../../../assets/image_button_background.jpeg')}>
        <TouchableOpacity style={styles.touch}>
            <Text style={styles.text}>
                {props.title}
            </Text>
        </TouchableOpacity>
    </ImageBackground>
}

const styles = StyleSheet.create({
    imageBackground: {
        height: 200,
        resizeMode: 'cover',
    },
    touch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#c23616',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default ImageButton
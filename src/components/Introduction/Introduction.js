import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';

const Introduction = (props) => {

    const handleOnPress = () => {
        alert('Handle when pressing');
    }

    const HandleBrowseButton = () => {
        props.navigation.navigate('MainTab');
    }

    const HandleLoginButton = () => {
        props.navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} decelerationRate={'normal'} snapToInterval={windowWidth} snapToAlignment={'center'} style={styles.scroll}>
                <View style={styles.viewInScroll}>
                    <ImageBackground style={styles.imageBackground} source={require('../../../assets/image_introduction.jpg')}>
                        <TouchableOpacity style={styles.touchableOpacity} onPress={handleOnPress}></TouchableOpacity>
                    </ImageBackground>
                    <View style={{display: 'flex', flexDirection: 'column', }}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Take video courses</Text>
                        <Text style={{fontSize: 15, paddingTop: 10, textAlign: 'center'}}>From cooking to coding and everything in between</Text>
                    </View>
                </View>
                <View style={styles.viewInScroll}>
                    <ImageBackground style={styles.imageBackground} source={require('../../../assets/image_introduction.jpg')}>
                        <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={handleOnPress}></TouchableOpacity>
                    </ImageBackground>
                    <View style={{display: 'flex', flexDirection: 'column', }}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Learn from experts</Text>
                        <Text style={{fontSize: 15, paddingTop: 10, textAlign: 'center'}}>Approachable expert-instructor, vetted by 40 million students</Text>
                    </View>
                </View>
                <View style={styles.viewInScroll}>
                    <ImageBackground style={styles.imageBackground} source={require('../../../assets/image_introduction.jpg')}>
                        <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={handleOnPress}></TouchableOpacity>
                    </ImageBackground>
                    <View style={{display: 'flex', flexDirection: 'column', }}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Go at your own pace</Text>
                        <Text style={{fontSize: 15, paddingTop: 10, textAlign: 'center'}}>Lifetime access to courses, watch them anytime, anywhere</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonArea}>
                <TouchableOpacity onPress={HandleBrowseButton}>
                    <Text style={styles.textInButton}>Browse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={HandleLoginButton}>
                    <Text style={styles.textInButton}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        scroll: {
            flex: 1
        },
        viewInScroll: {
            width: windowWidth,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        imageBackground: {
            width: windowWidth,
            height: 200,
            resizeMode: 'cover',
        },
        touchableOpacity: {
            width: '100%',
            height: '100%'
        },
        buttonArea: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 50,
            backgroundColor: 'skyblue',
            alignItems: 'center'
        },
        textInButton: {
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
        }
})

export default Introduction
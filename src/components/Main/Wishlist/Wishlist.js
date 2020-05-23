import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ListCourses from '../../Courses/ListCourses/ListCourses'

const Wishlist = () => {
    return (
        <View>
            <Text>Wishlist</Text>
            <ListCourses></ListCourses>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Wishlist
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ListCourses from '../../Courses/ListCourses/ListCourses'
import {MainContext} from '../../../../App';

const Wishlist = () => {
    const context = MainContext.Consumer;
    const wishlist = context._currentValue.wishlist;

    return (
        <View>
            <ListCourses></ListCourses>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Wishlist
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ListCourses from '../../Courses/ListCourses/ListCourses'

const MyCourses = () => {
    return (
        <View>
            <Text>My Courses</Text>
            <ListCourses></ListCourses>
        </View>
    )
}

const styles = StyleSheet.create({})

export default MyCourses
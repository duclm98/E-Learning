import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import SectionCourserItem from '../SectionCoursesItem/SectionCoursesItem'

function SectionCourses(props) {
    const courses = [
        {
            id: 1,
            title: 'React native',
            author: 'Hai Pham',
            level: 'Advance',
            released: 'May 6, 2020',
            duration: '30 hours'
        },
        {
            id: 2,
            title: 'NodeJS',
            author: 'Huy Nguyen',
            level: 'Advance',
            released: 'May 10, 2020',
            duration: '50 hours'
        },
        {
            id: 3,
            title: 'CICD',
            author: 'Huy Nguyen',
            level: 'Advance',
            released: 'May 10, 2020',
            duration: '60 hours'
        }
    ]

    const renderCoursesList = (courses)=>{
        return courses.map(item => <SectionCourserItem item = {item}></SectionCourserItem>)
    }

    return <View>
        <View>
            <Text style = {styles.title}>{props.title}</Text>
        </View>
        <ScrollView horizontal = {true}>
            {renderCoursesList(courses)}
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 30,
        paddingLeft: 5
    }
})

export default SectionCourses
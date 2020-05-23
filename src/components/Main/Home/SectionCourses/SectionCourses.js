import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SectionCourserItem from '../SectionCoursesItem/SectionCoursesItem';

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

    const HandleSeeAllButton = () => {
        props.navigation.navigate('ListCourses', {
            title: props.title
        });
    }

    return <View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style = {styles.title}>{props.title}</Text>
            <TouchableOpacity onPress={HandleSeeAllButton}>
                <Text style = {{fontSize: 20, paddingTop: 30, paddingRight: 20, color: 'darkslategrey'}}>
                    See all...
                </Text>
            </TouchableOpacity>
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
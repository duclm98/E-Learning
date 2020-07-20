import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SectionCoursesItem from '../SectionCoursesItem/SectionCoursesItem';

function SectionCourses(props) {
    const courses = [];

    const renderCoursesList = (courses)=>{
        return courses.map(item => <SectionCoursesItem key = {item.id} item = {item} navigation={props.navigation}></SectionCoursesItem>)
    }

    const HandleSeeAllButton = () => {
        props.navigation.navigate('ListCourses', {
            title: props.title,
            navigation: props.navigation
        });
    }

    const courses1 = courses.slice(0,3)

    return <View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style = {styles.title}>{props.title}</Text>
            <TouchableOpacity onPress={HandleSeeAllButton}>
                <Text style = {{fontSize: 20, paddingTop: 30, paddingRight: 20, color: '#EB4848'}}>
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
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SectionCoursesItem from '../SectionCoursesItem/SectionCoursesItem';
import { MainContext } from '../../../../../App';

function SectionCourses(props) {
    const context = MainContext.Consumer;
    const courses = context._currentValue.courses;

    const renderCoursesList = (courses)=>{
        return courses.map(item => <SectionCoursesItem key = {item.id} item = {item} navigation={props.navigation}></SectionCoursesItem>)
    }

    const HandleSeeAllButton = () => {
        props.navigation.navigate('ListCourses', {
            title: props.title,
            navigation: props.navigation
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
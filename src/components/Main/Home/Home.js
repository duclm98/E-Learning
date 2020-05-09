import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SectionCourses from './SectionCourses/SectionCourses'

const Home = props => {
    return <ScrollView>
        <SectionCourses title='Categories'/>
        <SectionCourses title='Top courses in Design'/>
        <SectionCourses title='Top courses in Business'/>
        <SectionCourses title='Top courses in Design'/>
        <SectionCourses title='Top courses in IT and Software'/>
        <SectionCourses title='Top courses in Personal Development'/>
        <SectionCourses title='Students are viewing'/>
    </ScrollView>
}

const styles = StyleSheet.create({
    view:{
        
    }
})

export default Home
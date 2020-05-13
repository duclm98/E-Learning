import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import SectionCourses from './SectionCourses/SectionCourses'
import ImageButton from '../../Common/ImageButton'

const Home = props => {
    return <ScrollView>
        <ImageButton title='NEW RELEASES'></ImageButton>
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
    container: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 5,
    },
})

export default Home
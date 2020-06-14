import React from 'react';
import { StyleSheet, ScrollView, Animated } from 'react-native';
import SectionCourses from './SectionCourses/SectionCourses';
import ImageButton from '../../Common/ImageButton';
import { useCollapsibleStack } from 'react-navigation-collapsible';

const Home = props => {
    const {
        onScroll /* Event handler */ ,
        containerPaddingTop /* number */ ,
        scrollIndicatorInsetTop /* number */ ,
    } = useCollapsibleStack();

    return <Animated.ScrollView onScroll={onScroll} contentContainerStyle={{ paddingTop: 0 }} scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}>
        <ImageButton title='NEW RELEASES'></ImageButton>
        <SectionCourses title='Categories' navigation={props.navigation}/>
        <SectionCourses title='Top courses in Design' navigation={props.navigation}/>
        <SectionCourses title='Top courses in Business' navigation={props.navigation}/>
        <SectionCourses title='Top courses in Design' navigation={props.navigation}/>
        <SectionCourses title='Top courses in IT and Software' navigation={props.navigation}/>
        <SectionCourses title='Top courses in Personal Development' navigation={props.navigation}/>
        <SectionCourses title='Students are viewing' navigation={props.navigation}/>
    </Animated.ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 5,
    },
})

export default Home
import React from 'react';
import { Animated } from 'react-native';
import SectionCourses from './SectionCourses/SectionCourses';
import ImageButton from '../../Common/ImageButton';
import { useCollapsibleStack } from 'react-navigation-collapsible';

const Home = ({navigation}) => {
    const {
        onScroll /* Event handler */ ,
        scrollIndicatorInsetTop /* number */ ,
    } = useCollapsibleStack();

    return <Animated.ScrollView onScroll={onScroll} contentContainerStyle={{ paddingTop: 0 }} scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}>
        <ImageButton title='NEW RELEASES'></ImageButton>
        <SectionCourses title='Categories' navigation={navigation}/>
        <SectionCourses title='Top courses in Design' navigation={navigation}/>
        <SectionCourses title='Top courses in Business' navigation={navigation}/>
        <SectionCourses title='Top courses in Design' navigation={navigation}/>
        <SectionCourses title='Top courses in IT and Software' navigation={navigation}/>
        <SectionCourses title='Top courses in Personal Development' navigation={navigation}/>
        <SectionCourses title='Students are viewing' navigation={navigation}/>
    </Animated.ScrollView>
}

export default Home
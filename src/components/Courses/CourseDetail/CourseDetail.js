import React , {useContext} from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { MainContext } from '../../../../App';
import ImageButton from '../../Common/ImageButton';

const CourseDetail = (props) => {
    const context = MainContext.Consumer;
    const courseDetail = context._currentValue.courseDetail;

    const course = props.route.params.item;
    return <ScrollView>
        <ImageButton></ImageButton>
        <View style={{marginLeft: 5, marginRight: 5}}>
            <View>
                <Text style = {{fontSize: 25, fontWeight: 'bold'}}>{course.title}</Text>
                <Text style = {{fontSize: 20}}>{course.author}</Text>
                <Text style = {{fontSize: 20}}>{course.level} - {course.released} - {course.duration}</Text>
            </View>
            <Text></Text>
            <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textInButton}>Add to Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textInButton}>Download</Text>
                </TouchableOpacity>
            </View>
            <Text></Text>
            <View>
                <Text style = {styles.title}>Requirements</Text>
                <Text style = {styles.text}>{courseDetail.Requirements}</Text>
                <Text></Text>
                <Text style = {styles.title}>Description</Text>
                <Text style = {styles.text}>{courseDetail.Description}</Text>
                <Text></Text>
                <Text style = {styles.title}>Who this course is for:</Text>
                <Text style = {styles.text}>{courseDetail.for}</Text>
            </View>
        </View>
    </ScrollView>
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    text: {
        fontSize: 15
    },
    buttonArea:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:'#EB4848',
        width: (windowWidth)/2-10,
        height: 40
    },
    textInButton: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
})

export default CourseDetail;
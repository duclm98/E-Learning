import React , {useContext} from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, Button, TextInput } from 'react-native';
import ListCoursesItem from '../ListCoursesItem/ListCoursesItem';
import { context } from '../../../../App';

const ListCourses = (props) => {
    const courses = useContext(context).courses;
    const searchView = () => {
        return <View style={{flexDirection: 'row', margin: 5}}>
            <TextInput placeholder='Search text' style = {styles.textSearch}></TextInput>
            <Button title='Search' style={styles.buttonSearch}></Button>
        </View>
    }

    return <View>
        <FlatList
            data={courses}
            renderItem={({item})=><ListCoursesItem item={item}></ListCoursesItem>}
            // ListHeaderComponent={()=>searchView()}
        ></FlatList>
    </View>
}

const styles = StyleSheet.create({
    textSearch: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    buttonSearch: {
        width: 40,
        height: 60
    }
})

export default ListCourses;
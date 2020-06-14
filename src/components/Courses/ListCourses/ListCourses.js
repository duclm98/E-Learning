import React , {useContext} from 'react';
import { StyleSheet, Text, View, FlatList, SectionList, Button, TextInput } from 'react-native';
import ListCoursesItem from '../ListCoursesItem/ListCoursesItem';

const ListCourses = (props) => {
    return (
        <View>
            <FlatList
                data={props.data}
                renderItem={({item})=><ListCoursesItem item={item} navigation={props.navigation}></ListCoursesItem>}
            ></FlatList>
        </View>
    )
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
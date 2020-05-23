import React from 'react'
import { StyleSheet, Text, View, FlatList, SectionList, Button, TextInput } from 'react-native'
import ListCoursesItem from '../ListCoursesItem/ListCoursesItem'

const ListCourses = () => {
    const courses = [{
        id: 1,
        title: 'React native',
        author: 'Hai Pham',
        level: 'Advance',
        released: 'May 6, 2020',
        duration: '30 hours'
    }, {
        id: 2,
        title: 'NodeJS',
        author: 'Huy Nguyen',
        level: 'Advance',
        released: 'May 10, 2020',
        duration: '50 hours'
    }, {
        id: 3,
        title: 'CICD',
        author: 'Huy Nguyen',
        level: 'Advance',
        released: 'May 10, 2020',
        duration: '60 hours'
    }, {
        id: 4,
        title: 'React native',
        author: 'Hai Pham',
        level: 'Advance',
        released: 'May 6, 2020',
        duration: '30 hours'
    }, {
        id: 5,
        title: 'NodeJS',
        author: 'Huy Nguyen',
        level: 'Advance',
        released: 'May 10, 2020',
        duration: '50 hours'
    }, {
        id: 6,
        title: 'CICD',
        author: 'Huy Nguyen',
        level: 'Advance',
        released: 'May 10, 2020',
        duration: '60 hours'
    }]

    const searchView = ()=>{
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

export default ListCourses
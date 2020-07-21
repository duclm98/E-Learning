import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SectionCoursesItem from "../SectionCoursesItem/SectionCoursesItem";

import { courseAcction } from "../../../../redux";

function SectionCourses({
  navigation,
  dispatch,
  title,
  coursesFromState,
  changeCoursesFromState,
}) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (changeCoursesFromState) {
      dispatch(courseAcction.getCourses(5));
    }
  }, [changeCoursesFromState]);

  useEffect(() => {
    setCourses(coursesFromState);
  }, [coursesFromState]);

  const renderCoursesItem = (courses) => {
    return courses.map((item) => (
      <SectionCoursesItem
        key={item.id}
        item={item}
        id={item.id}
        navigation={navigation}
      ></SectionCoursesItem>
    ));
  };

  const HandleSeeAllButton = () => {
    navigation.navigate("ListCourses", {
      title: title,
      navigation: navigation,
    });
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={HandleSeeAllButton}>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 30,
              paddingRight: 20,
              color: "#EB4848",
            }}
          >
            See all...
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>{renderCoursesItem(courses)}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 30,
    paddingLeft: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    coursesFromState: state.courses,
    changeCoursesFromState: state.changeCourses,
  };
};

export default connect(mapStateToProps)(SectionCourses);

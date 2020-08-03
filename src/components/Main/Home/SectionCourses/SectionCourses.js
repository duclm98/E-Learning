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
  type,
}) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () =>{
      if (type === "1") {
        const data = await dispatch(courseAcction.getNewCourses(5, 1));
        if(data.status){
          setCourses(data.data);
        }
      } else if (type === "2") {
        const data = await dispatch(courseAcction.getRateCourses(5, 1));
        if(data.status){
          setCourses(data.data);
        }
      } else if (type === "3") {
        const data = await dispatch(courseAcction.getRecommendCourses(5, 1));
        if(data.status){
          setCourses(data.data);
        }
      }
    }
    getCourses();
  }, [type]);

  const renderCoursesItem = (courses) => {
    if (courses) {
      return courses.map((item) => (
        <SectionCoursesItem
          key={item.id}
          item={item}
          id={item.id}
          navigation={navigation}
        ></SectionCoursesItem>
      ));
    }
  };

  const HandleSeeAllButton = () => {
    navigation.navigate("ListCourses", {
      title: title,
      type: type,
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
  };
};

export default connect(mapStateToProps)(SectionCourses);

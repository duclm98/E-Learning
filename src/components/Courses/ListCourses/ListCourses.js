import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, FlatList } from "react-native";
import ListCoursesItem from "../ListCoursesItem/ListCoursesItem";

import { courseAcction } from "../../../redux";

const ListCourses = ({ navigation, route, dispatch }) => {
  const [data, setData] = useState([]);
  const type = route.params.type;

  useEffect(() => {
    const getCourses = async () => {
      if (type === "1") {
        const data = await dispatch(courseAcction.getNewCourses(100, 1));
        if (data.status) {
          setData(data.data);
        }
      } else if (type === "2") {
        const data = await dispatch(courseAcction.getRateCourses(100, 1));
        if (data.status) {
          setData(data.data);
        }
      } else if (type === "3") {
        const data = await dispatch(courseAcction.getRecommendCourses(100, 1));
        if (data.status) {
          setData(data.data);
        }
      }
      if (!["1", "2", "3", "4"].includes(type)) {
        const data = await dispatch(
          courseAcction.getCoursesByCategoryID(type, 100, 1)
        ); // Type chính là category ID
        if (data.status) {
          setData(data.data);
        }
      }
    };
    getCourses();
  }, [type]);

  return (
    <View style={{ display: "flex", flex: 1, backgroundColor: "#C6E2FF" }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListCoursesItem
            item={item}
            navigation={navigation}
          ></ListCoursesItem>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  textSearch: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonSearch: {
    width: 40,
    height: 60,
  },
});

export default connect()(ListCourses);

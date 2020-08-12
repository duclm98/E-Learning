import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, FlatList } from "react-native";
import ListCoursesItem from "../../Courses/ListCoursesItem/ListCoursesItem";

import { courseAcction } from '../../../redux';

const MyCourses = ({ navigation, dispatch, myCoursesFromState }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (myCoursesFromState.isChange) {
      dispatch(courseAcction.getMyCourses());
    }
  }, [myCoursesFromState.isChange]);

  useEffect(() => {
    setData(myCoursesFromState.data);
  }, [myCoursesFromState]);

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#C6E2FF",
      }}
    >
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

const mapStateToProps = (state) => {
  return {
    myCoursesFromState: state.myCourses,
  };
};

export default connect(mapStateToProps)(MyCourses);

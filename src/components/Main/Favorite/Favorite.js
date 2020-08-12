import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, FlatList } from "react-native";
import ListCoursesItem from "../../Courses/ListCoursesItem/ListCoursesItem";

import { courseAcction } from "../../../redux";

const Favorite = ({ navigation, dispatch, favoritesFromState }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (favoritesFromState.isChange) {
      dispatch(courseAcction.getFavorites());
    }
  }, [favoritesFromState]);

  useEffect(() => {
    setData(favoritesFromState.data);
  }, [favoritesFromState]);

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
    favoritesFromState: state.favorites,
  };
};

export default connect(mapStateToProps)(Favorite);

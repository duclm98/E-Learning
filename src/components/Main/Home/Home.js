import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Animated } from "react-native";
import SectionCourses from "./SectionCourses/SectionCourses";
import ImageButton from "../../Common/ImageButton";
import { useCollapsibleStack } from "react-navigation-collapsible";

import { categoryAcction } from "../../../redux";

const Home = ({
  navigation,
  dispatch,
  categoriesFromState,
  changeCategoriesFromState,
}) => {
  const {
    onScroll /* Event handler */,
    scrollIndicatorInsetTop /* number */,
  } = useCollapsibleStack();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (changeCategoriesFromState) {
      dispatch(categoryAcction.getCategories());
    }
  }, [changeCategoriesFromState]);

  useEffect(() => {
    setCategories(categoriesFromState);
  }, [categoriesFromState]);

  const renderCategories = (categories) => {
    return categories.map((item) => (
      <SectionCourses
        key={item.id}
        title={item.name}
        navigation={navigation}
      ></SectionCourses>
    ));
  };

  return (
    <Animated.ScrollView style={{backgroundColor:'#C6E2FF'}}
      onScroll={onScroll}
      contentContainerStyle={{ paddingTop: 0 }}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
    >
      <ImageButton title="NEW RELEASES"></ImageButton>
      {renderCategories(categories)}
    </Animated.ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesFromState: state.categories,
    changeCategoriesFromState: state.changeCategories,
  };
};

export default connect(mapStateToProps)(Home);

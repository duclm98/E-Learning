import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Animated } from "react-native";
import SectionCourses from "./SectionCourses/SectionCourses";
import ImageButton from "../../Common/ImageButton";
import { useCollapsibleStack } from "react-navigation-collapsible";

const Home = ({
  navigation,
  dispatch,
}) => {
  const {
    onScroll /* Event handler */,
    scrollIndicatorInsetTop /* number */,
  } = useCollapsibleStack();

  return (
    <Animated.ScrollView style={{backgroundColor:'#C6E2FF'}}
      onScroll={onScroll}
      contentContainerStyle={{ paddingTop: 0 }}
      scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
    >
      <ImageButton title="NEW RELEASES"></ImageButton>
      <SectionCourses key='1' type='1' title='Khóa học mới nhất' navigation={navigation}></SectionCourses>
      <SectionCourses key='2' type='2' title='Khóa học nổi bật' navigation={navigation}></SectionCourses>
      <SectionCourses key='3' type='3' title='Đề xuất cho bạn' navigation={navigation}></SectionCourses>
      <SectionCourses key='4' type='4' title='Khóa học của tôi' navigation={navigation}></SectionCourses>
    </Animated.ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(Home);

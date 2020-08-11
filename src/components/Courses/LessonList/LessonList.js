import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { courseAcction } from "../../../redux";

const LessonList = ({ navigation, data }) => {
  const hourToTime = (hour) => {
    const totalSecond = parseInt(hour * 3600);
    const hTemp = parseInt(totalSecond / 3600);
    const mTemp = parseInt((totalSecond % 3600) / 60);
    const h = hTemp < 10 ? `0${hTemp}` : `${hTemp}`;
    const m = mTemp < 10 ? `0${mTemp}` : `${mTemp}`;
    return `${h}:${m}:00`;
  };

  const renderLessonList = (data) => {
    return data.map((value, index) => (
      <View style={styles.container}>
        <View
          style={{
            ...styles.container2,
            paddingRight: 68,
          }}
        >
          <Text style={styles.title1}>Bài {index + 1}: </Text>
          <Text style={styles.title1}>{value.name}</Text>
        </View>
        <Text style={{ ...styles.title1, width: 58 }}>
          {hourToTime(value.hours)}
        </Text>
      </View>
    ));
  };

  const renderSectionList = (data) => {
    return data.map((value, index) => (
      <View>
        <View style={styles.container}>
          <View
            style={{
              ...styles.container2,
              paddingRight: 110,
            }}
          >
            <Text style={styles.title}>Phần {index + 1}: </Text>
            <Text style={styles.title}>{value.name}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: 100,
            }}
          >
            <Text style={styles.title1}>{value.lesson.length} bài</Text>
            <Text style={{ ...styles.title1, paddingLeft: 10 }}>
              {hourToTime(value.sumHours)}
            </Text>
          </View>
        </View>
        {renderLessonList(value.lesson)}
      </View>
    ));
  };

  return (
    <View style={{ backgroundColor: "#C6E2FF" }}>
      {data ? renderSectionList(data) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title1: {
    fontSize: 15,
    paddingTop: 1,
  },
  text: {
    fontSize: 15,
  },
});

export default connect()(LessonList);

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";

import instance from "../../../services/AxiosServices";
import * as LocalStorageServices from "../../../services/LocalStorageServices";

import { courseAcction } from "../../../redux";

const LessonList = ({ data, setCurrentLesson, courseID }) => {
  const hourToTime = (hour) => {
    const totalSecond = parseInt(hour * 3600);
    const hTemp = parseInt(totalSecond / 3600);
    const mTemp = parseInt((totalSecond % 3600) / 60);
    const h = hTemp < 10 ? `0${hTemp}` : `${hTemp}`;
    const m = mTemp < 10 ? `0${mTemp}` : `${mTemp}`;
    return `${h}:${m}:00`;
  };

  function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }

  const renderLessonList = (data) => {
    return data.map((value) => (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            ...styles.container2,
            paddingRight: 68,
          }}
          onPress={async () => {
            const accessToken = await LocalStorageServices.getAccessToken();
            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            let youtubeURL = false;
            let videoURL = "";
            let currentTime = 0;
            let isFinish = false;
            try {
              const { data } = await instance.get(
                `https://api.itedu.me/lesson/video/${courseID}/${value.id}`
              );
              currentTime = parseInt(data.payload.currentTime) * 1000;
              isFinish = data.payload.isFinish;

              videoURL = data.payload.videoUrl;
              youtubeURL = matchYoutubeUrl(videoURL);
            } catch (error) {}

            setCurrentLesson({
              numberOrder: value.numberOrder,
              name: value.name,
              videoURL,
              currentTime,
              isFinish,
              youtubeURL,
            });

            // Alert.alert("", "Vui lòng đợi trong khi video được load.");
          }}
        >
          <Text style={{ ...styles.title1, color: "blue" }}>
            Bài {value.numberOrder}:{" "}
          </Text>
          <Text style={{ ...styles.title1, color: "blue" }}>{value.name}</Text>
        </TouchableOpacity>
        <Text style={{ ...styles.title1, width: 58 }}>
          {hourToTime(value.hours)}
        </Text>
      </View>
    ));
  };

  const renderSectionList = (data) => {
    return data.map((value) => (
      <View>
        <View style={styles.container}>
          <View
            style={{
              ...styles.container2,
              paddingRight: 110,
            }}
          >
            <Text style={styles.title}>Phần {value.numberOrder}: </Text>
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

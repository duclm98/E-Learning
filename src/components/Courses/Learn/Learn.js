import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Video } from "expo-av";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import instance from "../../../services/AxiosServices";
import LessonList from "./LessonList";

import * as LocalStorageServices from "../../../services/LocalStorageServices";

import { courseAcction } from "../../../redux";

const Learn = ({
  navigation,
  route,
  dispatch,
  accountFromState,
  favoritesFromState,
  myCoursesFromState,
}) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [course, setCourse] = useState();
  const [currentLesson, setCurrentLesson] = useState({
    numberOrder: 0,
    name: "",
    videoURL: "",
    currentTime: 0,
    isFinish: false,
    youtubeURL: false,
  });

  useEffect(() => {
    if (route.params.id) {
      const id = route.params.id;
      const getCourse = async (id) => {
        const account = await LocalStorageServices.getAccount();
        try {
          const course = await instance.get(
            `course/get-course-detail/${id}/${account.id}`
          );
          try {
            const instructor = await instance.get(
              `instructor/detail/${course.data.payload.instructorId}`
            );
            const data = {
              ...course.data.payload,
              author: instructor.data.payload.name,
              released: moment(course.data.payload.updatedAt).format(
                "DD/MM/YYYY"
              ),
            };
            setCourse(data);
          } catch (error) {}
        } catch (error) {}
      };
      getCourse(id);
    }
  }, [route.params.id]);

  const getHeightYoutubeVideo = async (videoId) => {
    const metaData = await getYoutubeMeta(videoId);
    console.log((windowWidth * metaData.height) / metaData.width);
    return parseInt((windowWidth * metaData.height) / metaData.width);
  };

  // Chỉnh độ cao của video youtube
  const [youtubeVideoHeigh, setYoutubeVideoHeigh] = useState(0);
  useEffect(() => {
    if (currentLesson.youtubeURL !== false) {
      const getHeightYoutubeVideo = async (videoId) => {
        const metaData = await getYoutubeMeta(videoId);
        const height = parseInt(
          (windowWidth * metaData.height) / metaData.width
        );
        setYoutubeVideoHeigh(height);
      };
      getHeightYoutubeVideo(currentLesson.youtubeURL);
    }
  }, [currentLesson]);

  return (
    <View style={{ backgroundColor: "#C6E2FF", display: "flex", flex: 1 }}>
      {course ? (
        <ScrollView>
          <View style={{ height: 15 }}></View>
          {currentLesson.videoURL !== "" ? (
            <View>
              {currentLesson.youtubeURL === false ? (
                <Video
                  source={{
                    uri: currentLesson.videoURL,
                    overrideFileExtensionAndroid: "mov",
                  }}
                  // positionMillis={currentLesson.currentTime}
                  shouldPlay
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  isLooping={true}
                  useNativeControls
                  resizeMode={Video.RESIZE_MODE_CONTAIN}
                  style={{
                    width: windowWidth,
                    height: 250,
                  }}
                />
              ) : (
                <YoutubePlayer
                  ref={playerRef}
                  height={youtubeVideoHeigh}
                  width={windowWidth}
                  videoId={currentLesson.youtubeURL}
                  play={playing}
                  onChangeState={(event) => console.log(event)}
                  onReady={() => console.log("ready")}
                  onError={(e) => console.log(e)}
                  onPlaybackQualityChange={(q) => console.log(q)}
                  playbackRate={1}
                  playerParams={{
                    cc_lang_pref: "us",
                    showClosedCaptions: true,
                  }}
                />
              )}
            </View>
          ) : (
            <Image
              source={{ uri: course.imageUrl }}
              style={{ height: 200, resizeMode: "cover" }}
            ></Image>
          )}
          <View style={{ marginLeft: 5, marginRight: 5 }}>
            <View>
              {currentLesson.numberOrder === 0 ? (
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {course.title}
                </Text>
              ) : (
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  Bài {currentLesson.numberOrder}: {currentLesson.name}
                </Text>
              )}
            </View>
            <Text></Text>

            <View>
              <Text style={styles.title}>Danh sách bài học</Text>
              <LessonList
                data={course.section}
                setCurrentLesson={setCurrentLesson}
                courseID={course.id}
              ></LessonList>
              <Text></Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
  },
  buttonArea: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#EB4848",
    width: windowWidth / 2 - 10,
    height: 40,
  },
  textInButton: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return {
    accountFromState: state.account,
    favoritesFromState: state.favorites,
    myCoursesFromState: state.myCourses,
  };
};

export default connect(mapStateToProps)(Learn);

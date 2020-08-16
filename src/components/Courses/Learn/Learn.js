import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Video } from "expo-av";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import instance from "../../../services/AxiosServices";
import LessonList from "./LessonList";

import * as LocalStorageServices from "../../../services/LocalStorageServices";

import { otherActions } from "../../../redux";

const Learn = ({ navigation, route, dispatch }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [course, setCourse] = useState();
  const [currentLesson, setCurrentLesson] = useState({
    lessonID: "",
    numberOrder: 0,
    name: "",
    totalTime: "",
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

  // Tải bài học
  const [buttonTitle, setButtonTitle] = useState("Tải bài học");
  const [progress, setProgress] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  const [downloaded, setDownloaded] = useState([]);
  const [
    isGetDownloadedFromLocalStorage,
    setIsGetDownloadedFromLocalStorage,
  ] = useState(false);

  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes) {
      return "0 Bytes";
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

  const downloadVideo = async (
    lessonID,
    videoURL,
    numberOrder,
    name,
    totalTime
  ) => {
    if (lessonID === "" || videoURL === "") {
      return Alert.alert("Cảnh báo", "Không thể tải bài học");
    }

    let isDownload = false;
    downloaded.map((i) => {
      if (i.lessonID === lessonID) {
        isDownload = true;
      }
    });
    if (isDownload) {
      return Alert.alert("Cảnh báo", "Bạn đã tải bài học này");
    }

    setButtonTitle("Đang tải");

    const callback = (downloadProgress) => {
      setTotalSize(formatBytes(downloadProgress.totalBytesExpectedToWrite));

      let progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      progress = progress.toFixed(2) * 100;

      setProgress(progress.toFixed(0));
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      videoURL,
      FileSystem.documentDirectory + `${lessonID}.mp4`,
      {},
      callback
    );

    try {
      await downloadResumable
        .downloadAsync()
        .then(async ({ uri }) => {
          await saveFile(uri);
          const data = {
            lessonID,
            videoURL: uri,
            numberOrder,
            name,
            totalTime,
          };
          await dispatch(otherActions.saveDownloadedVideo(data));
          setIsGetDownloadedFromLocalStorage(false);
        })
        .catch((error) => {
          console.error(error);
        });
      setButtonTitle("Đã tải");
      setProgress(0);
      setTotalSize(0);
    } catch (e) {
      console.error(e);
    }
  };

  // Lấy thông tin các video đã tải từ local storage
  useEffect(() => {
    if (!isGetDownloadedFromLocalStorage) {
      const getDownloaded = async () => {
        const data = await LocalStorageServices.getAllDownloadedVideo();
        setDownloaded(data);
        setIsGetDownloadedFromLocalStorage(true);
      };
      getDownloaded();
    }
  }, [isGetDownloadedFromLocalStorage]);

  useEffect(() => {
    let isDownload = false;
    downloaded.map((i) => {
      if (i.lessonID === currentLesson.lessonID) {
        isDownload = true;
        return setButtonTitle("Đã tải");
      }
    });
    if (!isDownload) {
      setButtonTitle("Tải bài học");
    }
  }, [downloaded, currentLesson]);

  // Hiển thị các bài học đã tải
  const renderDownloaded = (downloaded) => {
    // Sắp xếp bài học tăng dần
    downloaded.sort(function (a, b) {
      return a.numberOrder - b.numberOrder;
    });

    return downloaded.map((value) => {
      let isExisted = false;
      course.section.map((i) => {
        i.lesson.map((j) => {
          if (j.id === value.lessonID) {
            isExisted = true;
          }
        });
      });
      if (isExisted) {
        return (
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                ...styles.container2,
                paddingRight: 68,
              }}
              onPress={async () => {
                setCurrentLesson({
                  numberOrder: value.numberOrder,
                  name: value.name,
                  totalTime: value.totalTime,
                  videoURL: value.videoURL,
                  currentTime: 0,
                  isFinish: false,
                  youtubeURL: false,
                  lessonID: value.lessonID,
                });
              }}
            >
              <Text style={{ ...styles.title1, color: "blue" }}>
                Bài {value.numberOrder}:{" "}
              </Text>
              <Text style={{ ...styles.title1, color: "blue" }}>
                {value.name}
              </Text>
            </TouchableOpacity>
            <Text style={{ ...styles.title1, width: 58 }}>
              {value.totalTime}
            </Text>
          </View>
        );
      }
    });
  };

  return (
    <View style={{ backgroundColor: "#C6E2FF", display: "flex", flex: 1 }}>
      {course ? (
        <ScrollView>
          {currentLesson.videoURL !== "" ? (
            <View>
              {currentLesson.youtubeURL === false ? (
                <View>
                  <View style={{ height: 15 }}></View>
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
                </View>
              ) : (
                <View>
                  <View style={{ height: 38 }}></View>
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
                </View>
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

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  downloadVideo(
                    currentLesson.lessonID,
                    currentLesson.videoURL,
                    currentLesson.numberOrder,
                    currentLesson.name,
                    currentLesson.totalTime
                  );
                }}
              >
                <Text style={styles.textInButton}>{buttonTitle}</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 15, margin: 5, paddingLeft: 10 }}>
                {totalSize}
              </Text>
              <Text style={{ fontSize: 15, margin: 5, paddingLeft: 10 }}>
                {progress} %
              </Text>
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
            <Text></Text>

            <View>
              <Text style={styles.title}>Danh sách bài học đã tải</Text>
              {renderDownloaded(downloaded)}
              <Text></Text>
            </View>
            <Text></Text>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
    backgroundColor: "green",
    width: windowWidth / 2 - 50,
    height: 30,
  },
  textInButton: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  title1: {
    fontSize: 15,
    paddingTop: 1,
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Learn);

import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import ImageButton from "../../Common/ImageButton";
import instance from "../../../services/AxiosServices";
import LessonList from "../LessonList/LessonList";

import { courseAcction } from "../../../redux";

const CourseDetail = ({
  navigation,
  route,
  dispatch,
  accountFromState,
  favoritesFromState,
  myCoursesFromState,
}) => {
  const [course, setCourse] = useState();
  const [isLike, setIsLike] = useState(false);
  const [isRegisterCourse, setIsRegisterCourse] = useState(false);

  useEffect(() => {
    let liked = false;
    for (let i = 0; i < favoritesFromState.data.length; i++) {
      if (favoritesFromState.data[i].id === route.params.id) {
        liked = true;
        break;
      }
    }
    setIsLike(liked);
  }, [favoritesFromState, route.params.id]);

  useEffect(() => {
    let registered = false;
    for (let i = 0; i < myCoursesFromState.data.length; i++) {
      if (myCoursesFromState.data[i].id === route.params.id) {
        registered = true;
        break;
      }
    }
    setIsRegisterCourse(registered);
  }, [myCoursesFromState, route.params.id]);

  // console.log(accountFromState)

  useEffect(() => {
    if (route.params.id) {
      const id = route.params.id;
      const getCourse = async (id) => {
        try {
          const course = await instance.get(
            `course/get-course-detail/${id}/null`
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

  const HandleLikeCourse = async (courseID) => {
    const likeCourse = await dispatch(courseAcction.likeCourse(courseID));
    if (!likeCourse.status) {
      return Alert.alert("Lỗi", likeCourse.msg);
    }
    if (isLike) {
      return Alert.alert("Thành công", "Bỏ thích khóa học thành công.");
    }
    return Alert.alert(
      "Thành công",
      "Thêm vào danh sách yêu thích thành công."
    );
  };

  const HandleFreelyRegisterCourse = async (courseID) => {
    if (isRegisterCourse) {
      return Alert.alert("Cảnh báo", "Bạn đã đăng kí khóa học này.");
    }
    const freelyRegisterCourse = await dispatch(
      courseAcction.freelyRegisterCourse(courseID)
    );
    if (!freelyRegisterCourse.status) {
      return Alert.alert("Lỗi", freelyRegisterCourse.msg);
    }
    return Alert.alert("Thành công", "Đăng kí khóa học thành công.");
  };

  const renderRequirement = (requirements) => {
    return requirements.map((i) => <Text style={styles.text}>{i}</Text>);
  };

  const renderLearnWhat = (learnWhat) => {
    return learnWhat.map((i) => <Text style={styles.text}>{i}</Text>);
  };

  return (
    <View style={{ backgroundColor: "#C6E2FF", display: "flex", flex: 1 }}>
      {course ? (
        <ScrollView>
          <Image
            source={{ uri: course.imageUrl }}
            style={{ height: 200, resizeMode: "cover" }}
          ></Image>
          <View style={{ marginLeft: 5, marginRight: 5 }}>
            <View>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {course.title}
              </Text>
              <Text style={{ fontSize: 15 }}>{course.subtitle}</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {course.author}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {course.released} - {course.totalHours}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Giá: {course.price} VNĐ
              </Text>
            </View>
            <Text></Text>
            <View style={styles.buttonArea}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => HandleLikeCourse(course.id)}
              >
                {isLike ? (
                  <Text style={styles.textInButton}>Bỏ thích</Text>
                ) : (
                  <Text style={styles.textInButton}>Yêu thích</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  HandleFreelyRegisterCourse(course.id);
                }}
              >
                {isRegisterCourse ? (
                  <Text style={styles.textInButton}>Đã đăng kí</Text>
                ) : (
                  <Text style={styles.textInButton}>Đăng kí miễn phí</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text></Text>
            <View>
              <Text style={styles.title}>Yêu cầu</Text>
              {renderRequirement(course.requirement)}
              <Text></Text>
              <Text style={styles.title}>Mô tả</Text>
              <Text style={styles.text}>{course.description}</Text>
              <Text></Text>
              <Text style={styles.title}>Học những gì?</Text>
              {renderLearnWhat(course.learnWhat)}
              <Text></Text>
              <Text style={styles.title}>Danh sách bài học</Text>
              <LessonList data={course.section}></LessonList>
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

export default connect(mapStateToProps)(CourseDetail);

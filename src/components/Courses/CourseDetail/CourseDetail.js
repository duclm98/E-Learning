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
  TextInput,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import instance from "../../../services/AxiosServices";
import LessonList from "./LessonList";
import SectionCoursesItem from "../../Main/Home/SectionCoursesItem/SectionCoursesItem";

import * as LocalStorageServices from "../../../services/LocalStorageServices";

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

  // Kiểm tra xem đã like khóa học chưa
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

  // Kiểm tra đã đăng kí khóa học chưa
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

  const HandleLearnNow = (courseID) => {
    navigation.navigate("Learn", {
      id: courseID,
    });
  };

  const renderRequirement = (requirements) => {
    return requirements.map((i) => <Text style={styles.text}>{i}</Text>);
  };

  const renderLearnWhat = (learnWhat) => {
    return learnWhat.map((i) => <Text style={styles.text}>{i}</Text>);
  };

  // Các khóa học liên quan
  const [coursesLikeCategory, setCoursesLikeCategory] = useState([]);
  useEffect(() => {
    const getData = async (courses) => {
      if (courses) {
        const data = await Promise.all(
          courses.map(async (i) => {
            try {
              const instructor = await instance.get(
                `instructor/detail/${i.instructorId}`
              );
              return {
                ...i,
                released: moment(i.updatedAt).format("DD/MM/YYYY"),
                author: instructor.data.payload.name,
              };
            } catch (error) {}
          })
        );
        setCoursesLikeCategory(data);
      }
    };
    if (course && course.coursesLikeCategory) {
      getData(course.coursesLikeCategory);
    } else {
      setCoursesLikeCategory([]);
    }
  }, [course]);

  // Hiển thị các khóa học liên quan
  const renderCoursesItem = (courses) => {
    if (courses) {
      return courses.map((item) => (
        <SectionCoursesItem
          key={item.id}
          item={item}
          id={item.id}
          navigation={navigation}
        ></SectionCoursesItem>
      ));
    }
  };

  const [ratingPoint, setRatingPoint] = useState(4);
  const [ratingContent, setRatingContent] = useState("");

  const HandleRating = async (courseID) => {
    const accessToken = await LocalStorageServices.getAccessToken();
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    try {
      const { data } = await instance.post("course/rating-course", {
        courseId: courseID,
        formalityPoint: ratingPoint,
        contentPoint: ratingPoint,
        presentationPoint: ratingPoint,
        content: ratingContent,
      });
      if (data.message === "OK") {
        return Alert.alert("", "Cảm ơn bạn đã đánh giá khóa học này");
      }
    } catch (error) {
      return Alert.alert(
        "",
        "Có lỗi trong quá trình đánh giá khóa học này, vui lòng thử lại!"
      );
    }
  };

  const renderRatingList = (ratingList) => {
    return ratingList.map((value) => (
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {value.user.name} ({parseInt(value.averagePoint % 5)}/5)
        </Text>
        <Text>{value.content}</Text>
        <View
          style={{
            borderBottomColor: "silver",
            borderBottomWidth: 1,
            paddingBottom: 5,
          }}
        />
      </View>
    ));
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

            {isRegisterCourse ? (
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    HandleLearnNow(course.id);
                  }}
                >
                  <Text style={styles.textInButton}>Vào học ngay</Text>
                </TouchableOpacity>
              </View>
            ) : null}
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
              <Text></Text>

              <Text style={styles.title}>Các khóa học liên quan</Text>
              <ScrollView horizontal={true}>
                {renderCoursesItem(coursesLikeCategory)}
              </ScrollView>
              <Text></Text>

              <Text style={styles.title}>Đánh giá khóa học</Text>
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <AirbnbRating
                  count={1}
                  reviews={[`${parseInt(course.averagePoint % 5)}`]}
                  defaultRating={1}
                  size={80}
                />
                <View>
                  <AirbnbRating
                    count={5}
                    reviews={[
                      "Không tốt",
                      "Tạm được",
                      "Bình thường",
                      "Rất tốt",
                      "Tuyệt vời quá",
                    ]}
                    defaultRating={ratingPoint}
                    size={30}
                    onFinishRating={(value) => {
                      setRatingPoint(value);
                    }}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Đánh giá của bạn"
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    value={ratingContent}
                    onChangeText={setRatingContent}
                  />
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <TouchableOpacity
                      style={styles.button2}
                      onPress={() => {
                        HandleRating(course.id);
                      }}
                    >
                      <Text style={styles.textInButton2}>
                        Gửi đánh giá của bạn
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {renderRatingList(course.ratings.ratingList)}
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
  button2: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "skyblue",
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
  textInButton2: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  textInput: {
    fontSize: 15,
    margin: 5,
    height: 40,
    width: windowWidth / 2 - 10,
    backgroundColor: "#fff",
    paddingLeft: 10,
    borderColor: "black",
    borderWidth: 0.2,
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

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
} from "react-native";
import ImageButton from "../../Common/ImageButton";
import instance from "../../../services/AxiosServices";

const CourseDetail = ({ navigation, route, dispatch }) => {
  const [id, setID] = useState(route.params.id);
  const [course, setCourse] = useState();

  useEffect(() => {
    if (id) {
      const getCourse = async (id) => {
        try {
          const course = await instance.get(`course/get-course-info?id=${id}`);
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
      setID(null);
    }
  }, [id]);

  const HandleAddToWishlist = () => {
    setWishlist([...wishlist, course]);
    navigation.canGoBack();
  };

  const renderRequirement = (requirements) => {
    return requirements.map((i) => <Text style={styles.text}>{i}</Text>);
  };

  const renderLearnWhat = (learnWhat) => {
    return learnWhat.map((i) => <Text style={styles.text}>{i}</Text>);
  };

  return (
    <View style={{ backgroundColor: "#C6E2FF" }}>
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
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Giá: {course.price} VNĐ</Text>
            </View>
            <Text></Text>
            <View style={styles.buttonArea}>
              <TouchableOpacity
                style={styles.button}
                onPress={HandleAddToWishlist}
              >
                <Text style={styles.textInButton}>Add to Wishlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textInButton}>Download</Text>
              </TouchableOpacity>
            </View>
            <Text></Text>
            <View>
              <Text style={styles.title}>Requirements</Text>
              {renderRequirement(course.requirement)}
              <Text></Text>
              <Text style={styles.title}>Description</Text>
              <Text style={styles.text}>{course.description}</Text>
              <Text></Text>
              <Text style={styles.title}>Learn what?</Text>
              {renderLearnWhat(course.learnWhat)}
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

export default connect()(CourseDetail);

import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const ListCoursesItem = ({ navigation, item }) => {
  const onPressItem = (id) => {
    navigation.navigate("CourseDetail", {
      id,
    });
  };

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onPressItem(item.id);
      }}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image}></Image>
      <View style={{ width: windowWidth - 120 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.author}</Text>
        <Text style={styles.text}>
          {item.released} - {item.totalHours}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  image: {
    margin: 5,
    width: 120,
    height: 100,
    resizeMode: "stretch",
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
  },
});

export default ListCoursesItem;

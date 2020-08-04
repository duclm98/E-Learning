import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

function SectionCourserItem({ navigation, item }) {
  const onPressItem = (id) => {
    navigation.navigate("CourseDetail", {
      id
    });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={()=>{onPressItem(item.id)}}>
      <Image source={{ uri: item.imageUrl }} style={styles.image}></Image>
      <View style={{ justifyContent: "space-around" }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.author}</Text>
        <Text style={styles.text}>
          {item.released} - {item.totalHours}H
        </Text>
        <Text style={styles.text}>
          Giá: {item.price} VNĐ
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 5,
    width: 230,
  },
  image: {
    resizeMode: "cover",
    width: 230,
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
  },
});

export default SectionCourserItem;

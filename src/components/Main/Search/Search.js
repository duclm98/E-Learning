import React, { useEffect, useState } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { connect } from "react-redux";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import ListCoursesItem from "../../Courses/ListCoursesItem/ListCoursesItem";

import { courseAcction } from "../../../redux";

const Search = ({ navigation, route, dispatch }) => {
  const [courses, setCourses] = useState([]);
  const [selectedItems, setSelectedItems] = useState();
  const [keyword, setKeyword] = useState("");

  var items = [
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Java",
    },
    {
      id: 3,
      name: "Ruby",
    },
    {
      id: 4,
      name: "React Native",
    },
    {
      id: 5,
      name: "PHP",
    },
    {
      id: 6,
      name: "Python",
    },
    {
      id: 7,
      name: "Go",
    },
    {
      id: 8,
      name: "Swift",
    },
  ];

  useEffect(() => {
    if (selectedItems) {
      setKeyword(selectedItems.name);
    }
  }, [selectedItems]);

  const handelSearch = async () => {
    const courses = await dispatch(
      courseAcction.searchCourses(keyword, 100, 1)
    );
    if (courses.status) {
      setCourses(courses.data);
    }
  };

  const renderSearchView = () => {
    return (
      <View style={{ display: "flex", flexDirection: "column", margin: 5 }}>
        <SearchableDropdown
          selectedItems={selectedItems}
          onItemSelect={(item) => {
            setSelectedItems(item);
          }}
          onRemoveItem={(item, index) => {
            setSelectedItems("");
          }}
          containerStyle={{ padding: 5 }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: "#ddd",
            borderColor: "#bbb",
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{ color: "#222" }}
          itemsContainerStyle={{ maxHeight: 140 }}
          items={items}
          defaultIndex={0}
          chip={true}
          resetValue={false}
          textInputProps={{
            placeholder: "Nhập từ khóa tìm kiếm tại đây",
            underlineColorAndroid: "transparent",
            style: {
              height: 40,
              paddingLeft: 10,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 5,
            },
            onTextChange: (text) => setKeyword(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
        <View style={{ padding: 5 }}>
          <Button title="Tìm kiếm" onPress={handelSearch}></Button>
        </View>
      </View>
    );
  };

  const renderFound = () => {
    return (
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <ListCoursesItem
            item={item}
            navigation={navigation}
          ></ListCoursesItem>
        )}
      ></FlatList>
    );
  };

  const renderNotFound = () => {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text></Text>
        <Text
          style={{ fontSize: 20, fontWeight: "bold", alignItems: "center" }}
        >
          Không có khóa học được tìm thấy
        </Text>
        <Text></Text>
      </View>
    );
  };

  return (
    <View>
      {renderSearchView()}
      {courses.length !== 0 ? renderFound() : renderNotFound()}
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Search);

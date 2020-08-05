import React, { useEffect, useState } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { connect } from "react-redux";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import ListCoursesItem from "../../Courses/ListCoursesItem/ListCoursesItem";

import { courseAcction } from "../../../redux";

const Search = ({ navigation, route, dispatch, historySearchFromState }) => {
  const [courses, setCourses] = useState([]);
  const [selectedItems, setSelectedItems] = useState();
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState(historySearchFromState);
  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setItems(historySearchFromState);
  }, [historySearchFromState]);

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
      setKeyword("");
    }
  };

  // Phân trang
  // 1 page chứa 5 items

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(courses.length / 5)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const tempData = courses.slice(currentPage * 5 - 5, currentPage * 5);
    setPage(tempData);
  }, [courses, currentPage]);

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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <Button title="<-- Prev" onPress={handlePrev}></Button>
          <Button title={currentPage.toString()}></Button>
          <Button title="Next -->" onPress={handleNext}></Button>
        </View>
      </View>
    );
  };

  const renderFound = () => {
    return (
      <FlatList
        data={page}
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
    <View style={{ display: "flex", flex: 1, backgroundColor: "#C6E2FF" }}>
      {renderSearchView()}
      {courses.length !== 0 ? renderFound() : renderNotFound()}
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    historySearchFromState: state.historySearch,
  };
};

export default connect(mapStateToProps)(Search);

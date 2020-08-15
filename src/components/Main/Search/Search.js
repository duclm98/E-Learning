import React, { useEffect, useState } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { connect } from "react-redux";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import ListCoursesItem from "../../Courses/ListCoursesItem/ListCoursesItem";

import { courseAcction, otherActions } from "../../../redux";

const Search = ({ navigation, route, dispatch, historySearchFromState }) => {
  const [courses, setCourses] = useState([]);
  const [selectedItems, setSelectedItems] = useState();
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState(historySearchFromState);
  const [isGetHistorySearch, setIsGetHistorySearch] = useState(false);
  const [category, setCategery] = useState({
    type: 1,
    data: [],
  });
  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isGetHistorySearch) {
      dispatch(otherActions.getHistorySearch());
      setIsGetHistorySearch(true);
    }
  }, [isGetHistorySearch]);

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

  // Phân loại tìm kiếm
  useEffect(() => {
    if (category.type === 1) {
      // Không phân loại
      setCategery((prev) => ({
        ...prev,
        data: courses,
      }));
    } else if (category.type === 2) {
      // Phân loại theo tác gỉa
      const data = [...courses];
      let index = 0;
      while (index < data.length - 1) {
        for (let i = index + 1; i < data.length; i++) {
          if (data[index].author === data[i].author) {
            index++;
            const temp = { ...data[index] };
            data[index] = { ...data[i] };
            data[i] = { ...temp };
          }
        }
        index++;
      }
      setCategery((prev) => ({
        ...prev,
        data,
      }));
    }
  }, [category.type, courses]);

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

  // Xử lý phân trang
  useEffect(() => {
    const tempData = category.data.slice(currentPage * 5 - 5, currentPage * 5);
    setPage(tempData);
  }, [category.data, currentPage]);

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
          }}
        >
          <View style={{ padding: 5, width: 75 }}>
            <Text style={{ paddingTop: 8, fontWeight: "bold" }}>
              Phân loại:
            </Text>
          </View>
          <View style={{ flex: 1, padding: 5 }}>
            <Button
              title="Tất cả"
              onPress={() => {
                setCategery((prev) => ({
                  ...prev,
                  type: 1,
                }));
              }}
            ></Button>
          </View>
          <View style={{ flex: 1, padding: 5 }}>
            <Button
              title="Tác giả"
              onPress={() => {
                setCategery((prev) => ({
                  ...prev,
                  type: 2,
                }));
              }}
            ></Button>
          </View>
          <View style={{ padding: 5, width: 100 }}>
            <Button
              title="Khóa học"
              onPress={() => {
                setCategery((prev) => ({
                  ...prev,
                  type: 3,
                }));
              }}
            ></Button>
          </View>
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

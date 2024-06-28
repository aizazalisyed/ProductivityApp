import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { getAllActivities, updateActivityStatus } from "../utils/database"; // Adjust the import path as necessary

export default function ActivityList({ isFocused }) {
  const [activities, setActivities] = useState([]);
  const [titleWidth, setTitleWidth] = useState(0);

  const fetchActivities = async () => {
    const allActivities = await getAllActivities();
    setActivities(allActivities);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchActivities();
    }
  }, [isFocused]);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "complete" ? "incomplete" : "complete";
    await updateActivityStatus(id, newStatus);
    fetchActivities(); // Refresh the list after updating the status
  };

  const renderItem = ({ item }) => (
    <View>
      <ImageBackground
        source={
          item.status === "complete"
            ? require("../assets/highlighted_list_item_bg.png")
            : require("../assets/list_item_bg.png")
        }
        style={styles.itemBackground}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: item.iconPath }}
            style={[
              styles.icon,
              item.status === "complete" && { tintColor: "white" },
            ]}
          />
          <View style={styles.textContainer}>
            <Text
              style={styles.title}
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setTitleWidth(width);
              }}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.time,
                { width: titleWidth },
                item.status === "complete" && { color: "white" },
              ]}
            >
              {item.startTime}
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleStatus(item.id, item.status)}>
            <Image
              source={require("../assets/tick.png")}
              style={[
                styles.checkIcon,
                item.status === "complete" && { tintColor: "white" },
              ]}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <FlatList
      data={activities}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    textTransform: "uppercase",
    textAlign: "center",
  },
  time: {
    fontSize: 14,
    color: "#fa617b",
    justifyContent: "center",
    textAlign: "center",
  },
  checkIcon: {
    width: 40,
    height: 40,
  },
  itemBackground: {
    flex: 1,
    borderRadius: 8,
  },
});

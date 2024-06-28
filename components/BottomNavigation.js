import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BottomNavigation({ screenName, onSave }) {
  const navigation = useNavigation();

  const handleSave = () => {
    if (onSave) onSave();
  };

  return (
    <ImageBackground
      source={require("../assets/nav_bar.png")}
      style={styles.navBarBackground}
    >
      <View style={styles.navBarContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../assets/home.png")}
            style={styles.iconHome}
          />
        </TouchableOpacity>

        {screenName === "AddActivity" ? (
          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={handleSave}
          >
            <Image
              source={require("../assets/tick_btn.png")}
              style={styles.addIcon}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={() => navigation.navigate("AddActivity")}
          >
            <Image
              source={require("../assets/add.png")}
              style={styles.addIcon}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image
            source={require("../assets/setting.png")}
            style={styles.iconSettings}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  navBarBackground: {
    width: "100%",
    height: 100, // Adjust based on your navbar image height
    position: "absolute",
    bottom: 0,
  },
  navBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 20,
  },
  iconHome: {
    width: 30,
    height: 30,
    marginTop: 30,
    marginStart: 50,
  },
  iconSettings: {
    width: 30,
    height: 30,
    marginTop: 30,
    marginEnd: 50,
  },
  addIconContainer: {
    position: "absolute",
    left: "50%",
    top: -1,
    transform: [{ translateX: -14 }],
    backgroundColor: "transparent",
    borderRadius: 50,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});

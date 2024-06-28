import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/avatar.png")}
        style={styles.imageLeft}
      />

      {/* Add spacing between images (optional) */}
      <View style={styles.imageSpacer} />

      <Image
        source={require("../assets/app_name.png")}
        style={styles.imageCenter}
      />

      <View style={styles.imageSpacer} />

      <TouchableOpacity>
        <Image
          source={require("../assets/menu_button.png")}
          style={styles.imageRight}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    width: "100%",
    paddingStart: 40,
    paddingEnd: 40,
  },
  imageLeft: {
    width: 50,
    height: 50,
  },
  imageCenter: {
    height: 20,
    width: 170,
    resizeMode: "contain",
  },
  imageRight: {
    width: 50,
    height: 50,
  },
  imageSpacer: {
    marginHorizontal: 10, // Add horizontal margin for spacing (optional)
  },
});

export default Header;

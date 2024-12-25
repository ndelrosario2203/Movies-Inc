import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Movies Inc</Text>
      <Text style={styles.subtitle}>Películas disponibles</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#282c34",
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
});

export default Header;

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>&copy; 2024 Movies Inc. Desarrollado por Noel Del Rosario.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#282c34",
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
  },
});

export default Footer;

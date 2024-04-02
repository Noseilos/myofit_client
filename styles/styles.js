import { StyleSheet, Platform, StatusBar } from "react-native";

export const colors = {
  color1: "#2ecc71",
  color1_light: "#5bc0de",
  color1_light2: "#89c4f4",
  color2: "white",
  color3: "#2ecc71",
  color4: "transparent",
  color5: "#f2f2f2",
  color6: "#f7f7f7",
  color7_black: "#000000"
};

export const defaultStyle = StyleSheet.create({
  padding: 20,
  paddingTop: 10,
  paddingBottom: 0,
  flex: 1,
  backgroundColor: colors.color2,
});

export const adminStyle = StyleSheet.create({
  padding: 20,
  paddingTop: 10,
  paddingBottom: 0,
  flex: 1,
  backgroundColor: colors.color7_black,
});

export const inputStyling = StyleSheet.create({
  height: 50,
  backgroundColor: colors.color2,
  marginVertical: 10,
  marginHorizontal: 20,
});

export const formHeading = {
  fontSize: 25,
  fontWeight: "500",
  textAlign: "center",
  // backgroundColor: colors.color3,
  color: colors.color3,
  padding: 5,
  borderRadius: 5,
};

export const adminFormHeading = {
  fontSize: 25,
  fontWeight: "500",
  textAlign: "center",
  // backgroundColor: colors.color3,
  color: colors.color7_black,
  padding: 5,
  borderRadius: 5,
};

export const inputOptions = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.color1,
};

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
    marginBottom:20
  },

  forget: {
    color: colors.color2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: "100",
  },

  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
  },

  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2,
  },

  link: {
    alignSelf: "center",
    color: colors.color2,
    fontSize: 18,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export const defaultImg =
  "https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png";

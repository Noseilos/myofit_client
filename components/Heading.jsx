import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
const Heading = ({ text1 = "Our", text2 = "Products", containerStyle }) => {
  return (
    <View style={containerStyle}>
      <Text style={{ fontSize: 25 }}>{text1}</Text>
      <Text style={{ fontSize: 25, fontWeight: "900" }}>{text2}</Text>
    </View>
  );
};
Heading.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  containerStyle: PropTypes.object,
}
export default Heading;
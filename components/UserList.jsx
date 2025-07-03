import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";
const UserList = ({
  id,
  name,
  email,
  address,
  city,
  country,
  deleteHandler,
  loading,
  admin = false,
  i = 0,
}) => {

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.color3,
      }}
    >
      <Text
        style={{
          ...styles.text,
          backgroundColor: i % 2 === 0 ? colors.color8_dgreen : colors.color11_lpcyan,
        }}
      >
        ID - #{id}
      </Text>

      <TextBox title={"Name"} value={name} i={i} />
      <TextBox title={"Email"} value={email} i={i} />
      <TextBox title={"Address"} value={address} i={i} />
      <TextBox title={"City"} value={city} i={i} />
      <TextBox title={"Country"} value={country} i={i} />

      {admin && (
        <Button
          icon={"delete"}
          mode={"contained"}
          textColor={i % 2 === 0 ? colors.color7_black : colors.color7_black}
          style={{
            width: 120,
            alignSelf: "center",
            marginTop: 10,
            backgroundColor: i % 2 === 0 ? colors.color3 : colors.color2,
          }}
          onPress={() => deleteHandler(id)}
          loading={loading}
          disabled={loading}
        >
          Delete
        </Button>
      )}
    </View>
  );
};
UserList.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  admin: PropTypes.bool,
  i: PropTypes.number,
}
const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.color7_black : colors.color7_black,
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {title === "Price" ? "₹" : ""}
    {value}
  </Text>
);
TextBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  i: PropTypes.number.isRequired,
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
    borderWidth: 3,
    borderColor: colors.color8_dgreen
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
});

export default UserList;

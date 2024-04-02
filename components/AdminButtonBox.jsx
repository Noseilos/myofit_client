import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const AdminButtonBox = ({
  icon,
  text,
  handler,
  reverse = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: reverse
          ? colors.color9_lpgreen
          : colors.color9_lpgreen,
        height: 90,
        width: 100,
        borderRadius: 30,
        alignItems: "center",
        padding: 5,
        borderWidth: 3,
        borderColor: colors.color8_dgreen,
        marginHorizontal: 2,
      }}
      onPress={() => handler(text)}
      disabled={loading}
    >
      <Avatar.Icon
        size={40}
        color={colors.color8_dgreen}
        style={{
          backgroundColor: reverse
            ? colors.color9_lpgreen
            : colors.color9_lpgreen,
        }}
        icon={icon}
      />
      <Text
        style={{
          color: colors.color8_dgreen,
          textAlign: "center",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default AdminButtonBox;

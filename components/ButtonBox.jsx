import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";


const ButtonBox = ({
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
                backgroundColor: reverse ? colors.color9_lpgreen : colors.color9_lpgreen,
                height: 80,
                width: 80,
                borderRadius: 20,
                alignItems: "center",
                borderWidth: 3,
                borderColor: colors.color8_dgreen,
            }}
            onPress={() => handler(text)}
            disabled={loading}
        >
            <Avatar.Icon
                size={50}
                color={colors.color81_dgreen2}
                style={{ backgroundColor: reverse ? colors.color9_lpgreen : colors.color9_lpgreen }}
                icon={icon}
            />
            <Text
                style={{
                    color: colors.color7_black,
                    textAlign: "center",
                    fontWeight: "500",
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default ButtonBox;
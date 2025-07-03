import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import PropTypes from "prop-types";
const ImageCard = ({ src, id, deleteHandler }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: src,
                }}
                style={{
                    width: "100%",
                    height: "80%",
                    resizeMode: "contain",
                }}
            />
            <TouchableOpacity onPress={() => deleteHandler(id)}>
                <Avatar.Icon
                    size={40}
                    icon={"delete"}
                    style={{
                        backgroundColor: colors.color1,
                        marginLeft: -40,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

ImageCard.propTypes = {
    src: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
}
export default ImageCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Add this line
        justifyContent: 'space-between',
        backgroundColor: colors.color2,
        elevation: 5,
        margin: 10,
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        height: 150,
    },
});
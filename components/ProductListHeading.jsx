import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../styles/styles";

const ProductListHeading = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Image</Text>
            <Text style={styles.text}>Price</Text>
            <Text style={{ ...styles.text, width: null, maxWidth: 120 }}>Name</Text>
            <Text style={{ ...styles.text, width: 60 }}>Category</Text>
            <Text style={styles.text}>Stock</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.color9_lpgreen,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 40,
        alignItems: "center",
        borderRadius: 100,
        padding: 10,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: colors.color8_dgreen
    },

    text: {
        width: 40,
        color: "black",
        fontWeight: "900",
    },
});

export default ProductListHeading;
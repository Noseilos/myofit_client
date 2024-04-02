import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../styles/styles";
import MyModal from "../components/MyModal";

const ProductListItem = ({
    navigate,
    deleteHandler,
    i,
    id,
    price,
    stock,
    name,
    category,
    imgSrc,
}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.9}
                onLongPress={() => setOpenModal((prev) => !prev)}
                // onLongPress={() => deleteHandler(id)}
                onPress={() => navigate.navigate("productdetails", { id })}
            >
                <View
                    style={{
                        ...styles.container,
                        backgroundColor: i % 2 === 0 ? colors.color9_lpgreen : colors.color9_lpgreen,
                    }}
                >
                    <Image
                        source={{
                            uri: imgSrc
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: "contain",
                        }}
                    />

                    <Text
                        style={{
                            width: 60,
                            color: colors.color8_dgreen,
                        }}
                        numberOfLines={1}
                    >
                        ₱{price}
                    </Text>

                    <Text
                        style={{
                            maxWidth: 120,
                            color: colors.color8_dgreen,
                        }}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>

                    <Text
                        style={{
                            width: 60,
                            color: colors.color8_dgreen,
                        }}
                        numberOfLines={1}
                    >
                        {category}
                    </Text>

                    <Text
                        style={{
                            width: 40,
                            color: colors.color8_dgreen,
                        }}
                        numberOfLines={1}
                    >
                        {stock}
                    </Text>
                </View>
            </TouchableOpacity>

            {openModal && (
                <MyModal
                    id={id}
                    deleteHandler={deleteHandler}
                    navigate={navigate}
                    setOpenModal={setOpenModal}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70,
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        marginVertical: 5,
        borderWidth: 3,
        borderColor: colors.color8_dgreen,
    },
});

export default ProductListItem;
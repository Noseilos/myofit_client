import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useSetCategories } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import {  colors } from "../styles/styles";
import Swiper from "react-native-swiper";
var { width} = Dimensions.get("window");
import PropTypes from 'prop-types';
const CategoryScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [categories, setCategories] = useState([]);
    useSetCategories(setCategories, isFocused);

    return (
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Categories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item._id}
                renderItem={({ item: category }) => (
                    <TouchableOpacity style={styles.card} onPress={() => {

                        navigation.navigate('home', { categoryId: category._id });
                    }}>
                        {/* <ImageBackground
                            source={{ uri: category.images[0].url }}
                            style={styles.imageBg}
                            imageStyle={styles.image}

                        >
                            <View style={styles.overlay} />
                            <Text style={styles.text}>{category.category}</Text>
                        </ImageBackground> */}
                        <View style={styles.imageBg}>
                            <Swiper
                                activeDotColor="white"
                                // paginationStyle={{
                                //     bottom: 10,
                                //     justifyContent: "center",
                                //     alignItems: "center",
                                // }}
                                // pagingEnabled={false}
                                showsPagination={false}
                                showButtons={false}
                                autoplay={true}
                                autoplayTimeout={2}
                            >
                                {category.images.map((item) => {
                                    return (
                                        <Image
                                            key={item.url}
                                            style={styles.imageBanner}
                                            resizeMode="cover"
                                            source={{ uri: item.url }}
                                        />
                                    );
                                })}

                            </Swiper>

                        </View><View style={styles.overlay} />
                        <View style={{position: "absolute",justifyContent: "center", alignItems: "center"}}>
                        
                        <Text style={styles.text}>{category.category}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.container}
                numColumns={2}
            />
        </View>
    );
};

CategoryScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 0,
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
    },
    card: {
        margin: 10,
        backgroundColor: 'gainsboro',
        borderRadius: 10,
        // padding: 10,
        elevation: 3, // for Android
        shadowOffset: { width: 1, height: 1 }, // for iOS
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200, // Add this line
        width: "45%"
    },
    imageBg: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",

        resizeMode: 'cover',
        borderRadius: 10,
    },
    text: {
        marginTop: 10,
        textAlign: 'center',
        color: colors.color5,
        fontWeight: "bold",
        fontSize: 24,
        fontFamily: 'Trushdex',
        textShadowColor: '#000',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    swiperContainer: {

        backgroundColor: "gainsboro",
        borderRadius: 10,
    },
    swiper: {
        width: width,
        height: width / 3,


    },
    imageBanner: {
        height: "100%",
        borderRadius: 10,

    },
});
export default CategoryScreen;
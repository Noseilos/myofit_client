import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View } from "react-native";
import Swiper from "react-native-swiper";
var { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            "https://res.cloudinary.com/dtrr0ihcb/image/upload/v1711894883/MYOFIT/assets/green_and_black_modern_gym_banner_5_pqfo4x.png",
            "https://res.cloudinary.com/dtrr0ihcb/image/upload/v1711894210/MYOFIT/assets/green_and_black_modern_gym_banner_2_kqqpl8.png",
            "https://res.cloudinary.com/dtrr0ihcb/image/upload/v1711894739/MYOFIT/assets/green_and_black_modern_gym_banner_4_bvpdib.png",
        ]);

        return () => {
            setBannerData([]);
        };
    }, []);

    return (

        <View style={styles.container}>
            <View style={styles.swiper}>
                <Swiper
                    activeDotColor="white"
                    paginationStyle={{
                        bottom: 10,
                        width: width - 40,

                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    showButtons={false}
                    autoplay={true}
                    autoplayTimeout={3}
                >
                    {bannerData.map((item) => {
                        return (
                            <Image
                                key={item}
                                style={styles.imageBanner}
                                resizeMode="cover"
                                source={{ uri: item }}
                            />
                        );
                    })}
                </Swiper>

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: "gainsboro",
        borderRadius: 10,
    },
    swiper: {
        width: width,
        height: width / 3,


    },
    imageBanner: {
        height: width / 3,
        width: width - 40,
        borderRadius: 10,

    },
});

export default Banner;
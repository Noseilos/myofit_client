import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { colors } from "../styles/styles";
import { Button } from "react-native-paper";
import { FontAwesome } from 'react-native-vector-icons';
const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.4; // Adjust this value as needed
const cardHeight = height * 0.35; // Adjust this value as needed
import PropTypes from "prop-types";
const ProductCard = ({
  stock,
  name,
  price,
  image,
  id,
  addToCardHandler,
  addToWishlistHandler,
  navigate,
}) => {
  const isOutOfStock = stock === 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigate.navigate("productdetails", { id })}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          width: cardWidth,
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10,
          borderRadius: 20,
          height: cardHeight,

        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: '100%',
            height: '50%',
            resizeMode: 'cover',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

          }}
        />

        <View
          style={{
            flexDirection: "column",
            padding: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: "300",
              width: "100%",
              
            }}
          >
            {name}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              marginBottom: 5,
              color: colors.color3,
              fontWeight: "bold"
            }}
          >
            ₱{price}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.color3,
            borderRadius: 0,
            paddingVertical: 5,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            width: "100%",

          }}
        >
          <Button
            onPress={() => addToCardHandler(id, name, price, image, stock)}
            textColor={colors.color2}
            style={{ flex: 4 }}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
          </Button>
          <TouchableOpacity
            onPress={() => addToWishlistHandler(id, name, price, image, stock)}
            style={{ flex: 2, padding: 10 }}
          >
            <FontAwesome
              name="heart"
              size={20}
              color={colors.color2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProductCard.propTypes = {
  stock: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  addToCardHandler: PropTypes.func.isRequired,
  addToWishlistHandler: PropTypes.func.isRequired,
  navigate: PropTypes.object.isRequired, // Assuming navigate is an object with a navigate method
}
export default ProductCard;

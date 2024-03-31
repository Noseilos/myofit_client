import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { defaultStyle, colors, defaultImg } from "../styles/styles";
import Header from "../components/Header";
import Comment from "../components/Comment";
import Carousel from "react-native-snap-carousel";
import { Avatar, Button, Menu, IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getProductDetails } from "../redux/actions/productActions";
import { server } from "../redux/store";
import { AirbnbRating } from "react-native-ratings";



import { deleteComment, addComment, getAllComments, getProductRatings, getCommentsByRating } from "../redux/actions/commentActions";
import { FontAwesome } from 'react-native-vector-icons';

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({ route: { params } }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isCarousel = useRef(null);
  const isFocused = useIsFocused();
  const { user } = useSelector((state) => state.user);

  const product = useSelector(state => state.product);
  const [ratings, setRatings] = useState(average);
  const { comments, count } = useSelector((state) => state.comment); // Fetch comments from Redux store
  const average = useSelector((state) => state.comment.averageRating); // Fetch comments from Redux store
  const loading = useSelector((state) => state.comment.loading); // Fetch loading state from Redux store

  const {
    product: { name, price, stock, description, images },
  } = useSelector((state) => state.product);

  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = stock === 0;
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const filterComments = (value) => {
    if (value === 0) {
      dispatch(getProductRatings(params.id))
      dispatch(getAllComments(params.id));
      setRatings(Math.floor(average));
      value = Math.floor(average);
    }
    else {

      dispatch(getCommentsByRating(params.id, value));

    }
    setVisible(false);
    setRatings(value);
  }
  useEffect(() => {
    dispatch({ type: "resetRatingsAndComments" })
    dispatch(getAllComments(params.id)); // Fetch comments when component mounts
    dispatch(getProductDetails(params.id));
    dispatch(getProductRatings(params.id));

  }, [dispatch, params.id, isFocused]);
  useEffect(() => {
    if (average !== 0) {
      setRatings(Math.floor(average))
    }
    else {
      setRatings(1);
    }
  }, [average])
  const incrementQty = () => {
    if (stock <= quantity) {
      return Toast.show({
        type: "error",
        text1: "Maximum Value Added",
      });
    }
    setQuantity((prev) => prev + 1);
  };

  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCardHandler = () => {
    if (!user) {
      navigate.navigate("login");
      return;
    }
    if (stock === 0) {
      return Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });
    }

    dispatch({
      type: "addToCart",
      payload: {
        product: params.id,
        name,
        price,
        image: images[0]?.url,
        stock,
        quantity,
      },
    });

    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  const addToWishlistHandler = (id, name, price, image, stock) => {
    if (!user) {
      navigate.navigate("login");
      return;
    }
    dispatch({
      type: "addToWishlist",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
      }
    })

    Toast.show({
      type: "success",
      text1: "Added To Wishlist",
    });
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(deleteComment(commentId));
      Toast.show({
        type: "success",
        text1: "Comment deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      Toast.show({
        type: "error",
        text1: "Failed to delete comment",
      });
    }
  };
  return (

    <View style={{ ...defaultStyle, padding: 10, backgroundColor: colors.color1 }}>
      <FlatList
        data={comments}

        ListHeaderComponent={
          <>
            <Header back={true} />
            <Carousel
              layout="stack"
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              ref={isCarousel}
              data={images}
              renderItem={({ item, index }, ref) => <CarouselCardItem item={item} index={index} ref={ref} />}
            />
            <View
              style={{
                backgroundColor: colors.color2,
                padding: 30,
                paddingBottom: 0,
                borderTopLeftRadius: 55,
                borderTopRightRadius: 55,
              }}
            >
              <Text numberOfLines={2} style={{ fontSize: 25 }}>
                {name}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "900" }}>₱{price}</Text>
              <Text
                style={{ letterSpacing: 1, lineHeight: 20, marginVertical: 15 }}
                numberOfLines={8}
              >
                {description}
              </Text>

              {/* Render reviews */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 5,
                }}
              >
                <Text style={{ color: colors.color3, fontWeight: "400" }}>
                  Quantity
                </Text>
                <View
                  style={{
                    width: 80,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={decrementQty}>
                    <Avatar.Icon
                      icon={"minus"}
                      size={20}
                      style={{
                        borderRadius: 5,
                        backgroundColor: colors.color5,
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={style.quantity}>{quantity}</Text>
                  <TouchableOpacity onPress={incrementQty}>
                    <Avatar.Icon
                      icon={"plus"}
                      size={20}
                      style={{
                        borderRadius: 5,
                        backgroundColor: colors.color5,
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={addToCardHandler}
                  style={{ flex: 8 }}
                  disabled={isOutOfStock}>
                  <Button
                    icon={"cart"}
                    style={style.btn}
                    textColor={isOutOfStock ? colors.color2 : colors.color2}
                  >
                    {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToWishlistHandler(params.id, name, price, images[0]?.url, stock)} style={{ flex: 2, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                  <FontAwesome name="heart" size={24} color={colors.color1} />
                </TouchableOpacity>
              </View>

              {/* Rating */}
              <View style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
              }}>
                <View style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <Text style={{ fontSize: average !== 0 ? 30 : 25, fontWeight: "900", color: "#E8C007" }}>
                    {average !== 0 ? average : "No Ratings"}
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>
                    {average !== 0 && "Ave. Rating"}
                  </Text>
                </View>

                <View>

                  <AirbnbRating
                    count={5}
                    reviews={[`Poor`, `Fair`, `Good`, `Very Good`, `Excellent`]}
                    defaultRating={average === 0 ? 1:Math.floor(average)}
                    size={25}
                    onFinishRating={(value) => filterComments(value)}
                    isDisabled={true}
                  />
                </View>
              </View>


              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 20,
                  marginTop: 20,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Comments ({count})</Text>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  style={{ marginTop: 50, width: 200, backgroundColor: colors.color2 }}
                  anchor={
                    <IconButton
                      icon="filter"
                      size={30}
                      onPress={openMenu}
                      color="blue"
                    />
                  }>
                  <Menu.Item onPress={() => filterComments(0)} title="All" />
                  <Menu.Item onPress={() => filterComments(1)} title="1-Star" />
                  <Menu.Item onPress={() => filterComments(2)} title="2-Star" />
                  <Menu.Item onPress={() => filterComments(3)} title="3-Star" />
                  <Menu.Item onPress={() => filterComments(4)} title="4-Star" />
                  <Menu.Item onPress={() => filterComments(5)} title="5-Star" />
                </Menu>
              </View>

            </View>
          </>
        }
        renderItem={({ item }) => (<View style={{ flexDirection: "row", paddingHorizontal: 30, paddingVertical: 30, backgroundColor: "white" }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10, resizeMode: "cover" }}
            source={{ uri: item.user.avatar ? item.user.avatar.url : defaultImg }}
          />
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.user.name}</Text>
            <Text>Rating: {item.rating} stars</Text>
            <Text>Comment: {item.text}</Text>
            {user &&
              user.user &&
              (user.user.role === "admin" ||
                item.user === user.user._id ||
                user.user.role === "Guest") && (
                <TouchableOpacity
                  onPress={() => handleDeleteComment(item._id)}
                >
                  <Text style={{ color: "red" }}>Delete</Text>
                </TouchableOpacity>
              )}
          </View>
        </View>)}
        keyExtractor={(item, index) => index.toString()}



      />
      {/* <Comment ratings={ratings} setRatings={setRatings} /> */}
    </View>

  );
};

const CarouselCardItem = ({ item, index }) => (
  <View style={style.container} key={index}>
    <Image source={{ uri: item.url }} style={style.image} />
  </View>
);

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 250,
  },
  quantity: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
  button: {
    backgroundColor: '#007BFF', // Change this to your desired color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Change this to your desired color
    fontSize: 16,
  },
  commentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  formContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    marginRight: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default ProductDetails;

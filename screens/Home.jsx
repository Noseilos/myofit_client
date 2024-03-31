import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyle, colors } from "../styles/styles";
import Header from "../components/Header";
import { Avatar, Button, Searchbar } from "react-native-paper";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
/* import { Toast } from "react-native-paper"; */
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions";
import { useSetCategories } from "../utils/hooks";
import Banner from "../components/Banner";

const Home = () => {
  const [category, setCategory] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  const categoryButtonHandler = (id) => {
    if (id === category) {
      setCategory("");
    }
    else {
      setCategory(id);
    }

  };

  const addToCardHandler = (id, name, price, image, stock) => {
    if (!user) {
      navigate.navigate("login");
      return;
    }
    if (stock === 0)
      return Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });

    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: 1,
      },
    });

    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  const addToWishlistHandler = (id, name, price, image, stock) => {
    if (!user) {
      // If no user is logged in, navigate to the login page
      navigate.navigate("login"); // Replace "Login" with your actual login screen name
      return;
    }
    dispatch({
      type: "addToWishlist",
      payload: {
        product:
          id,
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

  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchQuery, category));
    }, 200);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  return (
    <>

      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      <View style={defaultStyle}>
        <View style={{height: "25"}}>
          <Banner />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          {/* Search bar */}

          <View style={{ width: "100%" }}>

            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Searchbar
                placeholder="Search..."
                onFocus={() => setActiveSearch((prev) => !prev)}
                style={{
                  marginTop: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View
          style={{
            flexDirection: "row",
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{
              alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
          >

            {categories.map((item, index) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color1 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color2 : "gray",
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>

        </View>

        {/* Products */}

        <View style={{
          flex: 1,

          paddingTop: 10,
        }}>

          <FlatList
            data={products}
            
            renderItem={({ item, index }) => (
              <ProductCard
                stock={item.stock}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCardHandler={addToCardHandler}
                addToWishlistHandler={addToWishlistHandler}
                id={item._id}
                key={item._id}
                i={index}
                navigate={navigate}
              />
            )}
            keyExtractor={item => item._id}
            numColumns={2} // Change this to the number of columns you want
            contentContainerStyle={{ alignItems: 'center', }}
          />
        </View>
      </View>
      
      <Footer activeRoute={"home"} />
    </>
  );
};

export default Home;

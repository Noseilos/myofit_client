import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import Header from "../../components/Header";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../../redux/actions/otherActions";
import Carousel from "react-native-snap-carousel";
import * as ImagePicker from "expo-image-picker";

const Categories = ({ navigation, route, navigate }) => {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState([]);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useSetCategories(setCategories, isFocused);

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  useEffect(() => {
    fetchCategories();
  }, [isFocused]);

  const fetchCategories = async () => {
    try {
      await dispatch(getAllCategories());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteCategory(id));
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const submitHandler = async () => {
    try {
      console.log("Submitting form data:", category, image);
      const myForm = new FormData();
      myForm.append("category", category);
      image.forEach((imageUri) => {
        myForm.append(`files`, {
          uri: imageUri,
          type: mime.getType(imageUri),
          name: imageUri.split("/").pop(),
        });
      });
      await dispatch(addCategory(myForm));
      exitAddForm();
      fetchCategories();
      navigation.navigate("categories");
    } catch (error) {
      console.log("Error adding category:", error);
    }
  };

  // Handler for selecting images
  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        multiple: true,
      });

      if (!result.cancelled && result.assets.length > 0) {
        const newImages = result.assets.map((asset) => asset.uri);
        setImage([...image, ...newImages]);
      }
    } catch (error) {
      console.log("Error picking images:", error);
    }
  };

  const exitAddForm = () => {
    setShowAddForm(false);
    setCategory("");
    setImage([]);
  };

  // Render function for carousel items
  const renderCarouselItem = ({ item, index }) => (
    <View key={index}>
      {item && (
        <Image
          style={{ width: 300, height: 150, resizeMode: "contain" }}
          source={{ uri: item }}
        />
      )}
    </View>
  );

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>Categories</Text>
      </View>

      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories &&
            categories.map((i) => (
              <CategoryCard
                name={i.category}
                id={i._id}
                key={i._id}
                deleteHandler={deleteHandler}
                navigation={navigation}
              />
            ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <View
          style={{
            width: 150,
            height: 80,
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          {/* Button to open multi-image picker */}
          <Button
            mode="contained"
            onPress={openImagePicker}
            style={{
              marginBottom: 20,
              marginTop: 10,
              backgroundColor: "#BC430B",
            }}
            icon="camera"
          >
            Add Images
          </Button>

          {/* Display selected images */}
          <View style={{ marginBottom: 20, alignItems: "center" }}>
            <Carousel
              layout="default"
              data={image}
              renderItem={renderCarouselItem }
              sliderWidth={300}
              itemWidth={300}
            />
          </View>
        </View>

        <TextInput
          {...inputOptions}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        {!showAddForm && (
          <Button
            textColor={colors.color2}
            style={{
              backgroundColor: colors.color1,
              margin: 20,
              padding: 6,
            }}
            loading={loading}
            disabled={!category}
            onPress={submitHandler}
          >
            Add
          </Button>
        )}
      </View>
      {/* add category form */}
    </View>
  );
};

const CategoryCard = ({ name, id, image, deleteHandler, navigate, navigation }) => (
  <View style={styles.cardContainer}>
    <Text style={styles.cardText}>{name}</Text>
    <TouchableOpacity onPress={() => deleteHandler(id)}>
      <Avatar.Icon
        icon={"delete"}
        size={30}
        style={{
          backgroundColor: colors.color1,
        }}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() =>
        navigation && navigation.navigate("updatecategory", { id })
      }
    >
      <Avatar.Icon
        icon={"pen"}
        size={30}
        style={{
          backgroundColor: colors.color1,
        }}
      />
    </TouchableOpacity>

    {/* {Array.isArray(image) && image.length > 0 ? (
      <Carousel
        layout="stack"
        data={image}
        renderItem={CarouselCardItem}
        sliderWidth={300}
        itemWidth={300}
        loop={true}
      />
    ) : (
      <Text>No images available</Text>
    )} */}
  </View>
);

const CarouselCardItem = ({ item, index }) => (
  <View key={index}>
      <Image source={{ uri: item.url }} style={styles.categoryImage} />
  </View>
);

export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color3,
  },

  cardContainer: {
    backgroundColor: colors.color2,
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

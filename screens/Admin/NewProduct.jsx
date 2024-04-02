import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from "../../styles/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/SelectComponent";
import { useSetCategories, useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { getAdminProducts } from "../../redux/actions/productActions";
import { createProduct } from "../../redux/actions/otherActions";
// import * as Icons from "react-native-heroicons/solid";
import * as ImagePicker from "expo-image-picker";
import Carousel from "react-native-snap-carousel";
import { IconButton } from "react-native-paper";

const NewProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Choose Category");
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useSetCategories(setCategories, isFocused);

  const fetchProducts = async () => {
    try {
      await dispatch(getAdminProducts());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const disableBtnCondition =
    !name || !description || !price || !stock || !image;

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

  const submitHandler = async () => {
    try {
      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("description", description);
      myForm.append("price", price);
      myForm.append("stock", stock);
      image.forEach((imageUri) => {
        myForm.append(`files`, {
          uri: imageUri,
          type: mime.getType(imageUri),
          name: imageUri.split("/").pop(),
        });
      });
      if (categoryID) {
        myForm.append("category", categoryID);
      }
      await dispatch(createProduct(myForm));
      navigation.navigate("adminpanel");
      fetchProducts();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  useEffect(() => {
    if (route.params?.image) {
      setImage((prevImages) => [...prevImages, ...route.params.image]);
    } else if (route.params?.imageSingle) {
      setImage((prevImages) => [...prevImages, route.params.imageSingle]);
    }
  }, [route.params]);

  const deleteImage = (index) => {
    const updatedImages = [...image];
    updatedImages.splice(index, 1); // Remove the image at the specified index
    setImage(updatedImages); // Update the state with the new array of images
  };

  const renderCarouselItem = ({ item, index }) => (
    <View key={index}>
      {item && (
        <View style={{ marginBottom: 5 }}>
          <Image
            style={{ width: 300, height: 150, resizeMode: "contain" }}
            source={{ uri: item }}
          />
          <IconButton
            icon="delete"
            color="#f44336"
            size={20}
            onPress={() => deleteImage(index)}
            style={{ alignSelf: "center" }}
          />
        </View>
      )}
    </View>
  );

  return (
    <>
      <View
        style={{
          ...defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        <Header back={true} />

        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>New Product</Text>
        </View>

        <ScrollView
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color3,
            borderWidth: 3,
            borderColor: colors.color8_dgreen
          }}
        >
          <View
            style={{
              justifyContent: "center",
              height: 650,
            }}
          >
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Carousel
                layout="default"
                data={image}
                renderItem={renderCarouselItem}
                sliderWidth={300}
                itemWidth={300}
                // loop={true}
              />
            </View>
            <Button
              mode="contained"
              onPress={openImagePicker}
              style={{ backgroundColor: colors.color9_lpgreen, marginHorizontal: 80,
                borderWidth: 3,
                borderColor: colors.color8_dgreen }}
              textColor={colors.color8_dgreen}
              icon="camera"
            >
              Add Images
            </Button>

            <TextInput
              {...inputOptions}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              {...inputOptions}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />

            <TextInput
              {...inputOptions}
              placeholder="Price"
              keyboardType="number-pad"
              value={price}
              onChangeText={setPrice}
            />
            <TextInput
              {...inputOptions}
              keyboardType="number-pad"
              placeholder="Stock"
              value={stock}
              onChangeText={setStock}
            />

            <Text
              style={{
                ...inputStyling,
                textAlign: "center",
                textAlignVertical: "center",
                borderRadius: 3,
              }}
              onPress={() => setVisible(true)}
            >
              {category}
            </Text>

            <Button
              textColor={colors.color2}
              style={{
                backgroundColor: colors.color1,
                margin: 20,
                padding: 6,
                borderWidth: 3,
                borderColor: colors.color8_dgreen
              }}
              onPress={submitHandler}
              loading={loading}
              disabled={disableBtnCondition}
            >
              Create
            </Button>
          </View>
        </ScrollView>
      </View>

      <SelectComponent
        categories={categories}
        setCategoryID={setCategoryID}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default NewProduct;

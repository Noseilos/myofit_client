import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from "../../styles/styles";
import Loader from "../../components/Loader";
import { Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/SelectComponent";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import { updateProduct } from "../../redux/actions/otherActions";
import {
  deleteProductImage,
  updateProductImage,
} from "../../redux/actions/otherActions";
import Carousel from "react-native-snap-carousel";
import * as ImagePicker from "expo-image-picker";
import ImageCard from "../../components/ImageCard";
import mime from "mime";

const UpdateProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { product } = useSelector((state) => state.product);

  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);
  const [productId] = useState(route.params.id);
  const [images] = useState(route.params.images || []);
  const [imageChanged, setImageChanged] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [fetchedImages, setFetchedImages] = useState(route.params.images || []);
  const [loading, setLoading] = useState(false);

  useSetCategories(setCategories, isFocused);

  const submitHandler = async () => {
    setLoading(true);
    try {
      await dispatch(
        updateProduct(
          route.params.id,
          name,
          description,
          price,
          stock,
          categoryID,
        )

      );
      if (selectedImages.length > 0) {
        const myForm = new FormData();
        selectedImages.forEach((image) => {
          myForm.append("files", {
            uri: image.uri,
            type: mime.getType(image.uri),
            name: image.uri.split("/").pop(),
          });
        });
        await dispatch(updateProductImage(route.params.id, myForm));
        setSelectedImages([]);
      }
      navigation.navigate("adminpanel");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadingOther = useMessageAndErrorOther(
    dispatch,
    navigation,
    "adminpanel"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProductDetails(route.params.id));
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [dispatch, route.params.id, isFocused]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setCategory(product.category?.category);
      setCategoryID(product.category?._id);
      setFetchedImages(product.images || []);
    }
  }, [product]);

  // Update Images
  useEffect(() => {
    if (route.params?.image) {
      setSelectedImages([...selectedImages, route.params.image]);
    }
  }, [route.params]);

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
        const newImages = result.assets.map((asset) => ({
          uri: asset.uri,
          id: asset.id,
        }));
        setSelectedImages([...selectedImages, ...newImages]);
      }
    } catch (error) {
      console.log("Error picking images:", error);
    }
  };

  const deleteHandler = async (imageId, imageUrl) => {
    try {
      console.log("Deleting image with ID:", imageId);
      console.log("Image URL:", imageUrl);

      if (imageUrl) {
        console.log("Deleting image from fetched images");
        await dispatch(deleteProductImage(productId, imageId));
        const updatedFetchedImages = fetchedImages.filter(
          (img) => img._id !== imageId
        );
        setFetchedImages(updatedFetchedImages);
      } else {
        console.log("Deleting image from selected images");
        await dispatch(deleteProductImage(productId, imageId));
        const updatedSelectedImages = selectedImages.filter(
          (img) => img.id !== imageId
        );
        setSelectedImages(updatedSelectedImages);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const renderCarouselItem = ({ item }) => {
    const imageId = item._id || item.id;
    const imageUrl = item.url || item.uri;

    return (
      <View>
        <ImageCard
          src={imageUrl}
          id={imageId}
          deleteHandler={deleteHandler}
          // containerStyle={styles.imageCard}
        />
      </View>
    );
  };

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
          <Text style={formHeading}>Update Product</Text>
        </View>

        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,
              backgroundColor: colors.color3,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                height: 650,
              }}
            >
              <ScrollView>
                <Carousel
                  data={[...(product?.images || []), ...selectedImages]}
                  renderItem={renderCarouselItem}
                  sliderWidth={300}
                  itemWidth={300}
                  layout={"default"}
                />
              </ScrollView>
              <Button
                mode="contained"
                onPress={openImagePicker}
                style={{
                  marginBottom: 20,
                  marginHorizontal: 20,
                  padding: 6,
                  backgroundColor: colors.color9_lpgreen,
                  borderWidth: 3,
                  borderColor: colors.color8_dgreen
                }}
                textColor={colors.color8_dgreen}
              >
                Select Images
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
                placeholder="Stock"
                value={stock}
                keyboardType="number-pad"
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
                }}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
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

export default UpdateProduct;

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  getCategoryDetails,
} from "../../redux/actions/otherActions";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/styles";
import * as ImagePicker from "expo-image-picker";
import {
  deleteCategoryImage,
  updateCategoryImage,
} from "../../redux/actions/otherActions";
import Carousel from "react-native-snap-carousel";
import ImageCard from "../../components/ImageCard";
import mime from "mime";

const UpdateCategory = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [id] = useState(route.params.id);
  const [loading, setLoading] = useState(false);
  const [categoryId] = useState(route.params.id);
  const [selectedImages, setSelectedImages] = useState([]);
  const [category, setCategoryName] = useState("");
  const [fetchedImages, setFetchedImages] = useState(route.params.images || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCategoryDetails(route.params.id));
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchData();
  }, [dispatch, route.params.id, isFocused]);

  const { category: categoryDetails } = useSelector((state) => state.other);

  useEffect(() => {
    if (categoryDetails) {
      setCategoryName(categoryDetails.category);
      setFetchedImages(categoryDetails.images || []);
    }
  }, [categoryDetails]);

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
        await dispatch(deleteCategoryImage(categoryId, imageId));
        const updatedFetchedImages = fetchedImages.filter(
          (img) => img._id !== imageId
        );
        setFetchedImages(updatedFetchedImages);
      } else {
        console.log("Deleting image from selected images");
        await dispatch(deleteCategoryImage(categoryId, imageId));
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
    const imageId = item._id || item.id; // Use item._id if it's a fetched image, otherwise use item.id for selected images
    const imageUrl = item.url || item.uri; // Use item.url if it's a fetched image, otherwise use item.uri for selected images

    return (
      <ImageCard src={imageUrl} id={imageId} deleteHandler={deleteHandler} />
    );
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      await dispatch(updateCategory(route.params.id, category));
      if (selectedImages.length > 0) {
        const myForm = new FormData();
        selectedImages.forEach((image) => {
          myForm.append("files", {
            uri: image.uri,
            type: mime.getType(image.uri),
            name: image.uri.split("/").pop(),
          });
        });
        await dispatch(updateCategoryImage(route.params.id, myForm));
        setSelectedImages([]);
      }
      navigation.navigate("categories");
      fetchData();
    } catch (error) {
      console.log("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategoryName(newCategory);
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
          <Text style={formHeading}>Update Category</Text>
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
                  data={[...(categoryDetails?.images || []), ...selectedImages]}
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
                  marginTop: 20,
                  marginHorizontal: 20,
                  padding: 6,
                  backgroundColor: "#BC430B",
                }}
              >
                Select Images
              </Button>

              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={category}
                onChangeText={handleCategoryChange}
              />

              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={loading}
                disabled={loading}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default UpdateCategory;

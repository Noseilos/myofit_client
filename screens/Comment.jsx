import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import StarRating from "react-native-star-rating"; // Import the star rating component
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../redux/actions/commentActions";
import { colors, inputOptions } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";

import PropTypes from "prop-types";

const Comment = ({ route }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [starCount, setStarCount] = useState(0); // State for star rating
  const dispatch = useDispatch();
  const { orderItems } = route.params
  const navigation = useNavigation();
  // Assuming you have user and product data available from redux state
  const { user } = useSelector((state) => state.user); // Update with actual selector

  const disableBtnCondition = !commentText;

  const handlePostComment = () => {
 
    dispatch(addComment(commentText, user._id, orderItems.product, starCount, navigation));

    // Show the toast
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false); // Hide the toast after 3 seconds
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Write a Review</Text>
      {/* Product Details */}
      <View style={styles.productDetails}>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.productName}>{orderItems.name}</Text>
          {/* Product Image */}
          <Image source={{ uri: orderItems.image }} style={styles.image} />
        </View>

        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "start" }}>
          <Text style={styles.productId}>Quantity: {orderItems.quantity}</Text>
          <Text style={styles.productId}>Price: ₱{orderItems.price}</Text>
        </View>

      </View>



      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, flexDirection: "column", alignItems: "center"}}

      >
        <StarRating
          disabled={false}
          maxStars={5}
          rating={starCount}
          selectedStar={(rating) => setStarCount(rating)}
          fullStarColor={"gold"}
          emptyStarColor={"gold"}
          
        />
        <Text>Rate us!</Text>
        {/* Your TextInput component goes here */}

      </KeyboardAvoidingView>

      <View style={styles.commentInputContainer}>
        <TextInput
          {...inputOptions}
          placeholder="Add your comment..."
          multiline={true}
          value={commentText}
          onChangeText={setCommentText}
          style={styles.commentInput} // Added style
        />
        <TouchableOpacity
          style={[styles.postButton, { marginLeft: 10,
            borderWidth: 3,
            borderColor: colors.color8_dgreen }]}
          onPress={handlePostComment}
          disabled={disableBtnCondition}
        >
          <Text style={styles.postButtonText}>Post Comment</Text>
        </TouchableOpacity>
      </View>

      {/* Toast */}
      {toastVisible && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Commented Successfully</Text>
        </View>
      )}
    </View>
  );
};
Comment.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      orderItems: PropTypes.object.isRequired, // Assuming orderItems is an object
    }).isRequired,
  }).isRequired,
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",

  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
    backgroundColor: "gainsboro"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productDetails: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productId: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold"
  },
  commentInputContainer: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Center items vertically
    width: "80%",
    marginBottom: 10,
  },
  commentInput: {
    flex: 1, // Take remaining space
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postButton: {
    backgroundColor: colors.color9_lpgreen,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  postButtonText: {
    color: colors.color8_dgreen,
    fontWeight: "bold",
    fontSize: 16,
  },
  toast: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  toastText: {
    color: "white",
  },
});

export default Comment;

import { Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  defaultImg,
} from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { acceptContactRequest } from "../redux/actions/chatActions";
import PropTypes from "prop-types";
const ContactRequest = ({ item }) => {
  
  const { user } = useSelector((state) => state.user);
  const currentUserId = user._id

  const dispatch = useDispatch();
  const navigation = useNavigation()
  
  const acceptRequest = (contactRequestId) => {
    dispatch(acceptContactRequest(currentUserId, contactRequestId, navigation)); 
  };


  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.image ? item.image : defaultImg }}
      />

      <Text
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}
      >
        {item?.name} sent you a contact request!!
      </Text>

      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

ContactRequest.propTypes = {
  item: PropTypes.object
}
export default ContactRequest;

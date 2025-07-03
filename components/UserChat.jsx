import { Text, View, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  defaultImg,
} from "../styles/styles";
import {  useDispatch } from "react-redux";

import { loadUser } from "../redux/actions/userActions";
import PropTypes from 'prop-types';
const UserChat = ({ item, lastMessage, newMessages, setNewMessages }) => {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, []);
 
  
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  return (
    <Pressable
      onPress={() =>{
        navigation.navigate("chatmessagescreen", {
          recepientId: item._id,
        })
        setNewMessages((prevNewMessages) => ({
          ...prevNewMessages,
          [item._id]: false,
        }))
      }
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item.avatar ? item.avatar.url : defaultImg }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: newMessages[item._id] ? "bold" : "500" }}>{item?.name}</Text>
        {lastMessage[item._id] && (
          <Text
            style={{
              marginTop: 3,
              color:newMessages[item._id] ? "black" : "gray" ,
              fontWeight:newMessages[item._id] ? "bold" :"500",

            }}
          >
            {lastMessage[item._id]?.message}
          </Text>
        )}
      </View>

      <View>
        <Text
          style={{
            fontSize: 11,
            fontWeight:newMessages[item._id] ? "bold" :"400",
            color: newMessages[item._id] ? "black" :"#585858",
          }}
        >
          {lastMessage[item._id] && formatTime(lastMessage[item._id]?.timeStamp)}
        </Text>
      </View>
    </Pressable>

  );
};
UserChat.propTypes = {
  item: PropTypes.object.isRequired,
  lastMessage: PropTypes.object.isRequired,
  newMessages: PropTypes.object.isRequired,
  setNewMessages: PropTypes.func.isRequired,
};
export default UserChat;

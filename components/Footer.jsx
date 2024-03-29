import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux"
import { FontAwesome } from 'react-native-vector-icons';

const Footer = ({ activeRoute = "home" }) => {
  const navigate = useNavigation();

  const { loading, isAuthenticated } = useSelector((state) => state.user)

  const navigationHandler = (key) => {
    switch (key) {
      case 0:
        navigate.navigate("home");
        break;
      case 1:
        navigate.navigate("cart");
        break;
      case 2:
        navigate.navigate("wishlist");
        break;
      case 3:
        navigate.navigate("chatscreen");
        break;
      case 4:
        navigate.navigate("contactscreen");
        break;
      case 5:
        navigate.navigate("peoplescreen");
        break;
      default:
        navigate.navigate("Home");
        break;
    }
  };

  const avatarOptions = {
    color: colors.color2,
    size: 45,
    style: {
      backgroundColor: colors.color1,
    },
  };
  return (
    <View
      style={{
        backgroundColor: colors.color1,
        // borderTopRightRadius: 120,
        // borderTopLeftRadius: 120,
        position: "relative",
        width: "100%",
        bottom: 0,
      }}
    >
      {/* Container */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
      {/* Home link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(0)}
        >
          <Avatar.Icon
            {...avatarOptions}
            icon={activeRoute === "home" ? "home" : "home-outline"}

          />
          <Text style={{
            fontWeight: "300",
            color: colors.color2,
            fontSize: 12,
            textAlign: "center",
            top: -5
          }}>Home</Text>
        </TouchableOpacity>
        
        
        {/* Chats Link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(3)}
          style={{ top: 0 }}
        >
          <Avatar.Icon
            {...avatarOptions}
            icon={activeRoute === "chatscreen" ? "message-text" : "message-text-outline"}
            size={45}
          
          />
          <Text style={{
            fontWeight: "300",
            color: colors.color2,
            fontSize: 12,
            textAlign: "center",
            top: -5
          }}>Chats</Text>
        </TouchableOpacity>
       
       {/* People link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(5)}
        >
          <Avatar.Icon
            {...avatarOptions}
            icon={activeRoute === "peoplescreen" ? "contacts" : "contacts-outline"}
          />
          <Text style={{
            fontWeight: "300",
            color: colors.color2,
            fontSize: 12,
            textAlign: "center",
            top: -5
          }}>People</Text>
        </TouchableOpacity>

        {/* Requests Link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(4)}
        >
          <Avatar.Icon
            {...avatarOptions}
            icon={activeRoute === "contactscreen" ? "account-plus" : "account-plus-outline"}
          />
          <Text style={{
            fontWeight: "300",
            color: colors.color2,
            fontSize: 12,
            textAlign: "center",
            top: -5
          }}>Requests</Text>
        </TouchableOpacity>

        {/* Cart Link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(1)}
        >
          <Avatar.Icon
            {...avatarOptions}
            icon={activeRoute === "cart" ? "shopping" : "shopping-outline"}
          />
          <Text style={{
            fontWeight: "300",
            color: colors.color2,
            fontSize: 12,
            textAlign: "center",
            top: -5
          }}>Cart</Text>
        </TouchableOpacity>

        {/* Wishlist Link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigationHandler(2)}

        >
          <Avatar.Icon
            {...avatarOptions}
            icon={
              activeRoute === "wishlist" ? "heart" : "heart-outline"
            }
          />
          <Text style={{
            fontWeight: "300",
            color: colors.color2,
            fontSize: 12,
            textAlign: "center",
            top: -5
          }}>Wishlist</Text>
        </TouchableOpacity>
      </View>

      {/* <View
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          backgroundColor: colors.color2,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          top: -40,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigationHandler(0)}
          >
            <Avatar.Icon
              {...avatarOptions}
              icon={activeRoute === "home" ? "home" : "home-outline"}
            />
            
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};

export default Footer;

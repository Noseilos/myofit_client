import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { colors } from "../styles/styles";
import { Button, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const OrderItem = ({
  id,
  price,
  address,
  orderedOn,
  status,
  orderItems,
  paymentMethod,
  updateHandler,
  admin = false,
  loading,
  name,
  i = 0,
}) => {
  const navigation = useNavigation("Comment");
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(!visible);
  const avatarOptions ={
    color: colors.color2,
    size: 45,
    style: {
      marginHorizontal: 20,
      marginTop: 0,
      backgroundColor:status === "Preparing" ? "black" : status === "Shipped" ? "orange" : status === "Delivered" ? colors.color1 : "black",
    },
  }
  const getProductIds = () => {
    return orderItems.map((item) => item.product);
  };
  const orderDetails = [
    { title: "Address", value: address },
    { title: "Ordered On", value: orderedOn },
    { title: "Price", value: price },
    { title: "Status", value: status },
    { title: "Payment Method", value: paymentMethod },
  ];
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.color2,
      }}
    >
      <View style={{
        ...styles.text,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        
        backgroundColor: status === "Preparing" ? "black" : status === "Shipped" ? "orange" : status === "Delivered" ? colors.color1 : "black",
      }}>

      <Text
        style={{
          ...styles.text2,
        }}
      >
        ID - #{id} 
        
      </Text>
      <Avatar.Icon {...avatarOptions} icon={status === "Preparing" ? "package-variant" : status === "Shipped" ? "truck" : "truck-check-outline"}/>
      </View>
     
      <Button onPress={openMenu}>{visible ? "Hide" : "Show"} order details</Button>
      {visible && (<>
      <TextBox title={"Name"} value={name} status={status}/>
      <TextBox title={"Address"} value={address} status={status} />
      <TextBox title={"Ordered On"} value={orderedOn} status={status} />
      <TextBox title={"Price"} value={price} status={status} />
      <TextBox title={"Status"} value={status} status={status} />
      <TextBox title={"Payment Method"} value={paymentMethod} status={status} />
      </>)}
      

      {orderItems.map((item, index) => (
        <View key={index}>
          <TextBox key={index} title={item.name} value={item.quantity} status={status} />
          {!admin && status === "Delivered" && (
            <Button
            key={item._id}
              textColor={colors.color2}
              style={{
                backgroundColor: colors.color1,
                margin: 20,
                padding: 6,
              }}
              onPress={() => navigation.navigate("comment", { orderItems: item })}
            >
              Write a Review
            </Button>
          )}
        </View>

      ))}

      {admin && (
        <Button
          icon={"update"}
          mode={"contained"}
          textColor={colors.color2}
          style={{
            width: 120,
            alignSelf: "center",
            marginTop: 10,
            backgroundColor: status === "Preparing" ? "black" : status === "Shipped" ? "orange" : status === "Delivered" ? colors.color1 : "black",
          }}
          onPress={() => updateHandler(id)}
          loading={loading}
          disabled={loading}
        >
          Update
        </Button>
      )}
    </View>
  );
};

const TextBox = ({ title, value, status }) => (
  <Text
    style={{
      marginVertical: 6,
      color: status ? (status === "Preparing" ? "black" : status === "Shipped" ? "orange" : status === "Delivered" ? colors.color1 : "black") : "black"
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title} - </Text>
    {title === "Price" ? "₱" : ""}
    {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

  },
  text2: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -25,
    marginTop: 0,
 
    
    paddingHorizontal: 20,
  

  },

});

export default OrderItem;

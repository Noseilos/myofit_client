import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, formHeading } from "../styles/styles";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { Button, Headline } from "react-native-paper";
import OrderItem from "../components/OrderItem";
import { useGetOrders } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";


const Orders = () => {
    const isFocused = useIsFocused();
    const { loading, orders } = useGetOrders(isFocused);

    const [selectedStatus, setSelectedStatus] = useState(null);
  
    const filterOrders = (status) => {
      setSelectedStatus(status);
    };
  
    const filteredOrders = selectedStatus
      ? orders.filter((order) => order.orderStatus === selectedStatus)
      : orders;

    return (
        <View
            style={{
                ...defaultStyle,
                backgroundColor: colors.color5,
            }}
        >
            <Header back={true} />

            {/* Heading */}
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
                <Text style={formHeading}>Orders</Text>
            </View>

            {/* Filter buttons */}
            <View
                style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
                }}
            >
                <Button
                style={{
                    backgroundColor:
                    selectedStatus === "Preparing" ? colors.color1 : colors.color5,
                    borderRadius: 100,
                    margin: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                }}
                onPress={() => filterOrders("Preparing")}
                >
                <Text
                    style={{
                    fontSize: 12,
                    color: selectedStatus === "Preparing" ? colors.color2 : "gray",
                    }}
                >
                    Preparing
                </Text>
                </Button>
                <Button
                style={{
                    backgroundColor:
                    selectedStatus === "Shipped" ? colors.color1 : colors.color5,
                    borderRadius: 100,
                    margin: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                }}
                onPress={() => filterOrders("Shipped")}
                >
                <Text
                    style={{
                    fontSize: 12,
                    color: selectedStatus === "Shipped" ? colors.color2 : "gray",
                    }}
                >
                    Shipped
                </Text>
                </Button>
                <Button
                style={{
                    backgroundColor:
                    selectedStatus === "Delivered" ? colors.color1 : colors.color5,
                    borderRadius: 100,
                    margin: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                }}
                onPress={() => filterOrders("Delivered")}
                >
                <Text
                    style={{
                    fontSize: 12,
                    color: selectedStatus === "Delivered" ? colors.color2 : "gray",
                    }}
                >
                    Delivered
                </Text>
                </Button>
            </View>

            {loading ? (
                <Loader />
            ) : (
                <View
                    style={{
                        padding: 10,
                        flex: 1,
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {orders.length > 0 ? (
                            filteredOrders.map((item, index) => (
                                
                                <OrderItem
                                    name={item.user.name}
                                    key={item._id}
                                    id={item._id}
                                    i={index}
                                    orderItems={item.orderItems}
                                    price={item.totalAmount}
                                    status={item.orderStatus}
                                    paymentMethod={item.paymentMethod}
                                    orderedOn={item.createdAt.split("T")[0]}
                                    address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                                />
                            ))
                        ) : (
                            <Headline style={{ textAlign: "center" }}>No Orders Yet</Headline>
                        )}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default Orders;
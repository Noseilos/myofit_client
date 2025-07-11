import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Chart from "../../components/Chart";
import ProductSalesChart from "../../components/ProductSalesChart";
import MonthlySalesChart from "../../components/MonthlySalesChart";
import UserSalesChart from "../../components/UserSalesChart";
import { useAdminProducts, useMessageAndErrorOther, useChartData } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import PropTypes from "prop-types";
const Analytics = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { chartData, chartData2, chartData3, loading } = useChartData(
        dispatch,
        isFocused
    );

    const { inStock, outOfStock } = useAdminProducts(
        dispatch,
        isFocused
    );

    const processAnalyticsLoading = useMessageAndErrorOther(
        navigation,
        "profile",
    );

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
                <Text style={formHeading}>Analytics</Text>
            </View>

            {loading ? (
                <Loader />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Inventory</Text>
                        <View
                            style={{
                                backgroundColor: colors.color3,
                                borderRadius: 20,
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >

                            <Chart
                                inStock={inStock}
                                outOfStock={outOfStock}
                                loading={processAnalyticsLoading}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Sales by Category</Text>
                        <View
                            style={{
                                backgroundColor: colors.color3,
                                borderRadius: 20,
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >

                            <ProductSalesChart
                                inStock={inStock}
                                outOfStock={outOfStock}
                                loading={processAnalyticsLoading}
                                data={chartData}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Units Sold</Text>
                        <View
                            style={{
                                backgroundColor: colors.color3,
                                borderRadius: 20,
                                alignItems: "center",
                                marginBottom: 10,

                            }}
                        >
                            <UserSalesChart
                                inStock={inStock}
                                outOfStock={outOfStock}
                                loading={processAnalyticsLoading}
                                data={chartData2}

                            />
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Monthly Revenue</Text>
                        <View
                            style={{
                                backgroundColor: colors.color3,
                                borderRadius: 20,
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >

                            <MonthlySalesChart
                                inStock={inStock}
                                outOfStock={outOfStock}
                                loading={processAnalyticsLoading}
                                data={chartData3}
                            />
                        </View>
                    </View>

                </ScrollView>
            )}
        </View>
    );
};
Analytics.propTypes = {
    navigation: PropTypes.object.isRequired,
};
export default Analytics;
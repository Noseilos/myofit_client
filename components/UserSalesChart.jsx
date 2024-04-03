import { View, Dimensions, Text, ScrollView } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";

const screenWidth = Dimensions.get("screen").width - 20 - 75;

const UserSalesChart = ({ data }) => {
    const randomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgba(${red}, ${green}, ${blue}, 1)`;
    };

    const chartConfig = {
        // backgroundColor: "#e26a00",
        backgroundGradientFrom: "#1E2923",
        backgroundGradientTo: "#08130D",
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };

    // Check if data and data.ordersCountByProduct are defined and an array before trying to map over it
    const transformedData = data && Array.isArray(data.ordersCountByProduct) ? data.ordersCountByProduct.map(item => item.totalAmount) : [];
    const labels = data && Array.isArray(data.ordersCountByProduct) ? data.ordersCountByProduct.map(item => item._id) : [];
    const barWidth= 100;
    const chartWidth = labels.length * barWidth;
    if (!transformedData.length) {
        return <Text>No orders to display</Text>;
    }

    return (
        <ScrollView horizontal>
            <View>

                <BarChart
                    data={{
                        labels: labels,
                        datasets: [
                            { data: transformedData }
                        ]
                    }}
                    width={chartWidth}
                    height={350}
                    yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={chartConfig}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        padding: 10
                    }}
                    // backgroundColor={colors.color3}
                    absolute
                    bezier
                    verticalLabelRotation={30}

                />

            </View>
        </ScrollView>
    );
};

export default UserSalesChart;
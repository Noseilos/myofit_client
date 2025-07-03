import { View, Text, ScrollView } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
import PropTypes from 'prop-types';
const UserSalesChart = ({ data }) => {

    const chartConfig = {
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

UserSalesChart.propTypes = {
    data: PropTypes.shape({
        ordersCountByProduct: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                totalAmount: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default UserSalesChart;
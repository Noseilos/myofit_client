import { View, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../styles/styles";
import PropTypes from "prop-types";
const screenWidth = Dimensions.get("screen").width - 20 - 75;

const Chart = ({ inStock = 0, outOfStock = 0 }) => {
    const data = [
        {
            name: "Out of Stock",
            population: outOfStock,
            color: colors.color12_dpurple,
            legendFontColor: colors.color7_black,
        },
        {
            name: "In Stock",
            population: inStock,
            color: colors.color1_dark,
            legendFontColor: colors.color7_black,
        },
    ];

    const chartConfig = {
        color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
    };

    return (
        <View >
            <PieChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                // backgroundColor={colors.color3}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
                hasLegend={true} // Show legends for each section
                legendFontSize={14} // Customize legend font size
            />
        </View>
    );
};
Chart.propTypes = {
    inStock: PropTypes.number,
    outOfStock: PropTypes.number,
};
export default Chart;
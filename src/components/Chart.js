import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import Spacer from '../components/spacer'

const chart = ({ data }) => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 255) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 8, // optional, default 3
    barPercentage: 0.5
  }

  return (
    <View>
      <Spacer>
        <Text>This month's expenses: </Text>
      </Spacer>
      <PieChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={chartConfig}
        accessor='sum'
        backgroundColor='transparent'
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default chart

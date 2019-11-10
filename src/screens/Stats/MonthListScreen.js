import React from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import Spacer from '../../components/Spacer'
import sortCostsByName from '../../helpers/sortCostsByName'
import countMonthsTotal from '../../helpers/countTotal'
import Chart from '../../components/Chart'
import findBudget from '../../helpers/findBudgetperName'

const StatsDetailScreen = ({ navigation }) => {
  const monthsBudget = navigation.state.params.allBudget
  const monthsCosts = navigation.state.params.month.item.expenses

  const currentYear = navigation.state.params.month.item.year
  const currentMonth = navigation.state.params.month.item.month

  const sortedCostsByName = sortCostsByName(monthsCosts)

  let dataForGraph = []
  let startCode = 80

  addToDataArray = (name, sum, month, year) => {
    let obj = {
      name: name,
      sum: countMonthsTotal(sum, month, year),
      color: `rgba(
                90,
                ${Math.floor(Math.random() * startCode)},
                ${startCode},
                1)`
    }
    dataForGraph.push(obj)

    if (startCode < 255) {
      startCode += 20
    }
  }

  return (
    <>
      <Spacer>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Name</Text>
          <Text style={styles.listTitle}>Expenses</Text>
          <Text style={styles.listTitle}>Budget</Text>
        </View>
        <FlatList
          data={sortedCostsByName}
          keyExtractor={item => item.name}
          renderItem={item => {
            addToDataArray(
              item.item.name,
              item.item.expenses,
              currentMonth,
              currentYear
            )
            return (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CostDetail', { item })}
                >
                  <View style={styles.listContainer}>
                    <Text style={styles.listItem}>{item.item.name}</Text>
                    <Text style={styles.listItem}>
                      {countMonthsTotal(item.item.expenses)}
                    </Text>
                    <Text style={styles.listItem}>
                      {findBudget(
                        monthsBudget,
                        item.item.name,
                        currentMonth,
                        currentYear
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
        />

        <Chart data={dataForGraph} />
      </Spacer>
    </>
  )
}

StatsDetailScreen.navigationOptions = {
  title: `Cost details screen`
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  listItem: {
    padding: 5,
    flex: 1,
    paddingBottom: 0
  },
  listTitle: {
    padding: 5,
    flex: 1,
    paddingBottom: 0,
    fontWeight: 'bold'
  }
})

export default StatsDetailScreen

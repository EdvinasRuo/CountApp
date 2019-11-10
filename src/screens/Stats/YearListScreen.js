import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { addExpense } from '../../redux/app-redux'
import sortCosts from '../../helpers/sortCostsByMonth'
import ListExpensesAndBudget from '../../components/ListCostsAndBudget'
import Spacer from '../../components/Spacer'

const mapStateToProps = state => {
  return {
    monthsExpenses: state.monthsExpenses,
    fixedExpenses: state.fixedExpenses,
    cachedFixedExpenses: state.cachedFixedExpenses,
    budget: state.budget,
    cachedBudget: state.cachedBudget
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addExpense: (name, cost) => {
      dispatch(addExpense(name, cost))
    }
  }
}

const StatsScreen = ({
  navigation,
  monthsExpenses,
  fixedExpenses,
  cachedFixedExpenses,
  budget,
  cachedBudget
}) => {
  const allBudget = budget.concat(cachedBudget)

  const sortedCosts = sortCosts(
    monthsExpenses,
    fixedExpenses,
    cachedFixedExpenses
  )

  return (
    <>
      <Spacer>
        {sortedCosts.length <= 0 ? (
          <Text style={styles.smallInfo}>
            No items added to expenses or budget yet.
          </Text>
        ) : (
          <ListExpensesAndBudget
            costs={sortedCosts}
            navigation={navigation}
            allBudget={allBudget}
          />
        )}
      </Spacer>
    </>
  )
}

StatsScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  smallInfo: {
    paddingTop: 20,
    fontSize: 13,
    color: 'grey'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsScreen)

import React from 'react'
import { StyleSheet } from 'react-native'
import Spacer from '../../components/spacer'
import { connect } from 'react-redux'
import { addExpense } from '../../redux/app-redux'
import sortCosts from '../../methods/sortCostsByMonth'
import ListExpensesAndBudget from '../../components/listCostsAndBudget'

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
        <ListExpensesAndBudget
          costs={sortedCosts}
          navigation={navigation}
          allBudget={allBudget}
        />
      </Spacer>
    </>
  )
}

StatsScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsScreen)

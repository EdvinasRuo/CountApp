import React from 'react'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { setNavigator } from './src/navigationRef'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './src/redux/app-redux'
import { PersistGate } from 'redux-persist/integration/react'
import HomeScreen from './src/screens/HomeScreen'
import AddExpenseScreen from './src/screens/AddExpenseScreen'
import FixedExpenseScreen from './src/screens/FixedCostListScreen'
import AddFixedExpenseScreen from './src/screens/AddFixedExpenseScreen'
import StatsScreen from './src/screens/Stats/YearListScreen'
import StatsDetailScreen from './src/screens/Stats/MonthListScreen'
import BudgetScreen from './src/screens/BudgetScreen'
import AddBudgetScreen from './src/screens/AddBudgetScreen'
import CostDetailScreen from './src/screens/Stats/DetailPerNameScreen'

const countApp = () => {
  const StatsFlow = createStackNavigator({
    StatList: StatsScreen,
    StatDetail: StatsDetailScreen,
    CostDetail: CostDetailScreen
  })

  const expenseFlow = createStackNavigator({
    Home: HomeScreen,
    AddExpense: AddExpenseScreen
  })

  const fixedExpenseFlow = createStackNavigator({
    FixedExpense: FixedExpenseScreen,
    AddFixedExpense: AddFixedExpenseScreen
  })

  const budgetFlow = createStackNavigator({
    Budget: BudgetScreen,
    AddBudget: AddBudgetScreen
  })

  StatsFlow.navigationOptions = {
    title: 'Statistics',
    tabBarIcon: <FontAwesome name='th-list' size={20} />
  }

  expenseFlow.navigationOptions = {
    title: 'Add Expenses',
    tabBarIcon: <FontAwesome name='plus' size={20} />
  }

  fixedExpenseFlow.navigationOptions = {
    title: 'Fixed Expenses',
    tabBarIcon: <AntDesign name='lock' size={20} />
  }

  budgetFlow.navigationOptions = {
    title: 'Budget',
    tabBarIcon: <FontAwesome name='money' size={20} />
  }

  const switchNavigator = createSwitchNavigator({
    mainFlow: createBottomTabNavigator({
      ExpenseFlow: expenseFlow,
      FixedExpense: fixedExpenseFlow,
      StatsFlow: StatsFlow,
      Budget: budgetFlow
    })
  })

  const App = createAppContainer(switchNavigator)

  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App
            ref={navigator => {
              setNavigator(navigator)
            }}
          />
        </PersistGate>
      </ReduxProvider>
    </>
  )
}

export default countApp

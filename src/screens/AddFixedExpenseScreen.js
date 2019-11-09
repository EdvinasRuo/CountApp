import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import Spacer from '../components/spacer'
import AddCosts from '../components/addCostForm'
import { connect } from 'react-redux'
import checkNumbers from '../helpers/validateNumbers'
import {
  setFavoriteTypes,
  setSearchTypes,
  addExpense,
  addFixedExpense
} from '../redux/app-redux'

// Redux
const mapStateToProps = state => {
  return {
    favoriteTypes: state.favoriteTypes,
    searchTypes: state.searchTypes,
    monthsExpenses: state.monthsExpenses,
    fixedExpenses: state.fixedExpenses
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setFavoriteTypes: type => {
      dispatch(setFavoriteTypes(type))
    },
    setSearchTypes: searchType => {
      dispatch(setSearchTypes(searchType))
    },
    addExpense: (name, cost) => {
      dispatch(addExpense(name, cost))
    },
    addFixedExpense: (name, cost) => {
      dispatch(addFixedExpense(name, cost))
    }
  }
}

const AddFixedExpenseScreen = props => {
  const [errorMessage, setErrorMessage] = useState('')

  addFixedCosts = ({ cost, type, quickMeniu }) => {
    // Validate type input
    if (!type) {
      setErrorMessage('You must enter a name of costs')
      return
    }
    type.trim()

    // Validate cost
    if (!cost) {
      setErrorMessage('You must enter a valid number.')
      return
    }
    let trimmedCost = checkNumbers(cost)
    if (!trimmedCost || trimmedCost === null || trimmedCost === '') {
      setErrorMessage('You must enter a valid number.')
      return
    }

    // Add to search array - always
    props.setSearchTypes(type)

    if (quickMeniu) {
      props.setFavoriteTypes(type)
    }

    // Add to Fixed costs
    props.addFixedExpense(type, cost)

    // Actions after
    setErrorMessage('')
    props.navigation.navigate('FixedExpense')
  }

  return (
    <>
      <Spacer>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <Spacer>
          <AddCosts onSubmit={addFixedCosts} />
        </Spacer>
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'white',
    backgroundColor: '#ff8a80',
    fontSize: 18,
    padding: 5,
    textAlign: 'center'
  }
})

AddFixedExpenseScreen.navigationOptions = {
  title: 'Add a fixed expense'
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFixedExpenseScreen)

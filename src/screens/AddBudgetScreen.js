import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { addToBudget } from '../redux/app-redux'
import Spacer from '../components/Spacer'
import validateNumbers from '../helpers/validateNumbers'

// Redux
const mapDispatchToProps = dispatch => {
  return {
    addToBudget: (name, sum) => {
      dispatch(addToBudget(name, sum))
    }
  }
}

const AddBudgetScreen = ({ addToBudget, navigation }) => {
  const [type, setType] = useState(null)
  const [sum, setSum] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  setExpense = sum => {
    setSum(validateNumbers(sum))
  }

  addBudget = (type, sum) => {
    // Validate type input
    if (!type) {
      setErrorMessage('You must enter a name of budget item.')
      return
    }
    type.trim()

    // Validate cost
    if (!sum) {
      setErrorMessage('You must enter a valid number.')
      return
    }

    let trimmedSum = validateNumbers(sum)
    if (!trimmedSum || trimmedSum === null || trimmedSum === '') {
      setErrorMessage('You must enter a valid number.')
      return
    }

    // Save budget
    addToBudget(type, sum)

    // Actions after
    setErrorMessage('')
    navigation.navigate('Budget')
  }

  return (
    <>
      <Spacer>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </Spacer>
      <Spacer>
        <Spacer>
          <Input
            label='Name'
            value={type}
            onChangeText={setType}
            autoCorrect={false}
            placeholder='Name of budget item'
            required
          />
          <Input
            label='Budget'
            value={sum}
            onChangeText={text => setExpense(text)}
            autoCorrect={false}
            keyboardType='numeric'
            placeholder='Enter months budget'
          />
        </Spacer>
        <Spacer>
          <Button title='Add budget' onPress={() => addBudget(type, sum)} />
        </Spacer>
      </Spacer>
    </>
  )
}

AddBudgetScreen.navigationOptions = {
  title: 'Add a new budget item'
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 15
  },

  errorMessage: {
    color: 'white',
    backgroundColor: '#ff8a80',
    fontSize: 18,
    padding: 5,
    textAlign: 'center'
  }
})

export default connect(
  null,
  mapDispatchToProps
)(AddBudgetScreen)

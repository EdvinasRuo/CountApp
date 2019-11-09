import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Input, CheckBox } from 'react-native-elements'
import Spacer from './spacer'
import validate from '../methods/validateNumbers'

const addCost = ({ onSubmit }) => {
  const [type, setType] = useState(null)
  const [cost, setCost] = useState(null)
  const [quickMeniu, setquickMeniu] = useState(false)

  // TO DO : Add dropdown in type - when typing

  setExpense = cost => {
    setCost(validate(cost))
  }

  return (
    <>
      <Input
        label='Name'
        value={type}
        onChangeText={setType}
        autoCorrect={false}
        placeholder='Enter name of cost'
        required
      />
      <Input
        label='Cost'
        value={cost}
        onChangeText={text => setExpense(text)}
        autoCorrect={false}
        keyboardType='numeric'
        placeholder='Enter cost'
      />
      <Spacer>
        <Button
          title='Add costs'
          onPress={() => onSubmit({ type, cost, quickMeniu })}
        />
      </Spacer>
      <CheckBox
        title='Show as quick-meniu item.'
        checked={quickMeniu}
        onPress={() => setquickMeniu(!quickMeniu)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  }
})

export default addCost

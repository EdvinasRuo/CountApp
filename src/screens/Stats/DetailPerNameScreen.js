import React from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { deleteExpense } from '../../redux/app-redux'
import Spacer from '../../components/Spacer'

const mapDispatchToProps = dispatch => {
  return {
    deleteExpense: id => {
      dispatch(deleteExpense(id))
    }
  }
}

const CostDetailScreen = ({ navigation, deleteExpense }) => {
  const deleteVarExpense = id => {
    deleteExpense(id)
    navigation.goBack()
  }

  const currentItem = navigation.state.params.item.item

  return (
    <>
      <Spacer>
        <Text>Expense name: {currentItem.name}</Text>
        <FlatList
          data={currentItem.expenses}
          keyExtractor={item => item.id}
          renderItem={renderItem => {
            return (
              <>
                <View style={styles.listContainer}>
                  {!renderItem.item.fixed ? (
                    <TouchableOpacity
                      onPress={() => deleteVarExpense(renderItem.item.id)}
                    >
                      <AntDesign
                        name='delete'
                        size={20}
                        style={styles.delIcon}
                      />
                    </TouchableOpacity>
                  ) : (
                    <AntDesign name='lock' size={20} style={styles.lockIcon} />
                  )}
                  <Text style={styles.listItem}>{renderItem.item.date}</Text>
                  <Text style={styles.listItem}>{renderItem.item.cost}</Text>
                </View>
              </>
            )
          }}
        />
      </Spacer>
    </>
  )
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
  delIcon: {
    color: 'red',
    padding: 5,
    paddingTop: 10
  },
  lockIcon: {
    color: 'grey',
    padding: 5,
    paddingTop: 10
  }
})

CostDetailScreen.navigationOptions = {
  title: `Cost logg screen`
}

export default connect(
  null,
  mapDispatchToProps
)(CostDetailScreen)

import React from 'react'
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { addFixedExpense, deleteFixedExpense } from '../redux/app-redux'
import { AntDesign } from '@expo/vector-icons'
import Spacer from '../components/Spacer'

// Redux
const mapStateToProps = state => {
  return {
    fixedExpenses: state.fixedExpenses
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addFixedExpense: (name, cost) => {
      dispatch(addFixedExpense(name, cost))
    },
    deleteFixedExpense: id => {
      dispatch(deleteFixedExpense(id))
    }
  }
}

const FixedCostsScreen = ({
  fixedExpenses,
  deleteFixedExpense,
  navigation
}) => {
  return (
    <>
      <Spacer>
        <Text h3>My Fixed costs</Text>
        {fixedExpenses.length > 0 ? (
          <FlatList
            data={fixedExpenses}
            keyExtractor={item => item.id}
            renderItem={renderItem => {
              return (
                <View>
                  <View style={styles.listContainer}>
                    <TouchableOpacity
                      onPress={() => deleteFixedExpense(renderItem.item.id)}
                    >
                      <AntDesign
                        name='delete'
                        size={25}
                        style={styles.delIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.listItem}>{renderItem.item.name}</Text>
                    <Text style={styles.listItem}>{renderItem.item.cost}</Text>
                  </View>
                  <Text style={styles.infoField}>Activated since:</Text>
                  <Text style={styles.infoField}>{renderItem.item.date}</Text>
                </View>
              )
            }}
          />
        ) : (
          <Text style={styles.smallInfo}>There are no fixed costs yet.</Text>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('AddFixedExpense')}
        >
          <AntDesign name='pluscircle' size={50} style={styles.plus} />
        </TouchableOpacity>
      </Spacer>
    </>
  )
}

FixedCostsScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  plus: {
    color: '#00e676',
    paddingTop: 15
  },
  listContainer: {
    flexDirection: 'row'
  },
  listItem: {
    padding: 5,
    flex: 1,
    fontSize: 25
  },
  infoField: {
    color: 'grey',
    fontSize: 14,
    paddingLeft: 5
  },
  delIcon: {
    color: 'red',
    padding: 5,
    paddingTop: 10
  },
  smallInfo: {
    fontSize: 13,
    color: 'grey'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FixedCostsScreen)

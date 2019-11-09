import React from 'react'
import { StyleSheet, TouchableOpacity, FlatList, View } from 'react-native'
import { Text } from 'react-native-elements'
import Spacer from '../components/spacer'
import { AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { deleteFromBudget } from '../redux/app-redux'

// Redux
const mapStateToProps = state => {
  return {
    budget: state.budget
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteFromBudget: id => {
      dispatch(deleteFromBudget(id))
    }
  }
}

const budgetScreen = ({ navigation, deleteFromBudget, budget }) => {
  return (
    <>
      <Spacer>
        <Text h3 style={styles.title}>
          Add budget for current month.
        </Text>
      </Spacer>
      <Spacer>
        <Text>Current budget items:</Text>
        {budget.length > 0 ? (
          <FlatList
            data={budget}
            keyExtractor={item => item.id}
            renderItem={item => {
              return (
                <View>
                  <View style={styles.listContainer}>
                    <TouchableOpacity
                      onPress={() => deleteFromBudget(item.item.id)}
                    >
                      <AntDesign
                        name='delete'
                        size={25}
                        style={styles.delIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.listItem}>{item.item.name}</Text>
                    <Text style={styles.listItem}>{item.item.cost}</Text>
                  </View>
                  <Text style={styles.infoField}>Activated since:</Text>
                  <Text style={styles.infoField}>{item.item.date}</Text>
                </View>
              )
            }}
          />
        ) : (
          <Text style={styles.smallInfo}>
            There are no budget items yet. Press plus below to add.
          </Text>
        )}
      </Spacer>
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('AddBudget')}>
          <AntDesign name='pluscircle' size={50} style={styles.plus} />
        </TouchableOpacity>
      </Spacer>
    </>
  )
}

budgetScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 15
  },
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
)(budgetScreen)

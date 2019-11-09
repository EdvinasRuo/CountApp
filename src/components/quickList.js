import React, { useState } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Spacer from '../components/spacer'
import {
  setFavoriteTypes,
  setSearchTypes,
  addExpense,
  deleteFavoriteType
} from '../redux/app-redux'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import validate from '../methods/validateNumbers'

// Redux
const mapStateToProps = state => {
  return {
    favoriteTypes: state.favoriteTypes,
    searchTypes: state.searchTypes
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
    deleteFavoriteType: id => {
      dispatch(deleteFavoriteType(id))
    }
  }
}

const quickList = ({ favoriteTypes, addExpense, deleteFavoriteType }) => {
  const [cost, setCost] = useState([])

  return (
    <View>
      <Spacer>
        {favoriteTypes.length > 0 ? (
          <View>
            <View style={styles.listContainer}>
              <Text style={styles.listItem}>Name</Text>
              <Text style={styles.listItem}>Cost</Text>
            </View>
            <FlatList
              data={favoriteTypes}
              keyExtractor={item => item.id}
              renderItem={item => {
                return (
                  <View style={styles.listContainer}>
                    <TouchableOpacity
                      onPress={() => deleteFavoriteType(item.item.id)}
                    >
                      <AntDesign
                        name='delete'
                        size={20}
                        style={styles.delIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.listItem}>{item.item.name}</Text>
                    <Input
                      value={cost[item.index]}
                      onChangeText={text => {
                        let indexedArray = []
                        indexedArray[item.index] = validate(text)
                        let updArray = Object.assign(cost, indexedArray)
                        setCost(updArray)
                      }}
                      autoCorrect={false}
                      placeholder='Enter cost'
                      containerStyle={styles.listItem}
                    />
                    <Button
                      style={styles.listItem}
                      title='Add'
                      onPress={() => {
                        addExpense(item.item.name, cost[item.index])
                      }}
                    />
                  </View>
                )
              }}
            />
          </View>
        ) : (
          <Text style={styles.smallInfo}>
            No favorites yet. Press plus sign and check favorte's check-box to
            add items here.{' '}
          </Text>
        )}
      </Spacer>
    </View>
  )
}

const styles = StyleSheet.create({
  elementsContainer: {
    flex: 1
  },
  listContainer: {
    flexDirection: 'row'
  },
  listItem: {
    padding: 5,
    flex: 1
  },
  smallInfo: {
    fontSize: 13,
    color: 'grey'
  },
  delIcon: {
    color: 'red',
    padding: 5,
    paddingTop: 10
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(quickList)

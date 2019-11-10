import React, { useState } from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import {
  setFavoriteTypes,
  setSearchTypes,
  addExpense,
  deleteFavoriteType
} from '../redux/app-redux'
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import Spacer from './Spacer'
import validate from '../helpers/validateNumbers'

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

  const saveRecord = (name, index) => {
    addExpense(name, index)
  }

  setValue = (text, index) => {
    let indexedArray = []
    indexedArray[index] = validate(text)
    let updArray = Object.assign(cost, indexedArray)
    setCost(updArray)
  }

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
              keyboardShouldPersistTaps='handled'
              data={favoriteTypes}
              keyExtractor={item => item.id}
              renderItem={renderItem => {
                return (
                  <View style={styles.listContainer}>
                    <TouchableOpacity
                      onPress={() => deleteFavoriteType(renderItem.item.id)}
                    >
                      <AntDesign
                        name='delete'
                        size={20}
                        style={styles.delIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.listItem}>{renderItem.item.name}</Text>
                    <Input
                      value={cost[renderItem.index]}
                      onChangeText={text => setValue(text, item.index)}
                      autoCorrect={false}
                      placeholder='Enter cost'
                      containerStyle={styles.listItem}
                    />
                    <Button
                      style={styles.listItem}
                      title='Add'
                      onPress={() =>
                        saveRecord(renderItem.item.name, cost[item.index])
                      }
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

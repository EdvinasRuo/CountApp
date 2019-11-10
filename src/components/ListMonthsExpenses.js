import React, { useState } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Text } from 'react-native-elements'
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native'
import { MaterialIcons } from '@expo/vector-icons'

const listMonthsExpenses = ({ array }) => {
  const [arrow, setArrow] = useState('expand-more')
  const [expInfo, setexpInfo] = useState('Show all')

  toggleArrow = () => {
    if (arrow === 'expand-more') {
      setArrow('expand-less')
      setexpInfo('Hide')
      return
    }
    setArrow('expand-more')
    setexpInfo('Show all')
  }

  return (
    <View>
      <Collapse onToggle={toggleArrow}>
        <CollapseHeader>
          <View style={styles.arrowContainer}>
            <MaterialIcons name={arrow} size={35} style={styles.expandIcon} />
            <Text style={styles.arrowText}>{expInfo}</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>Date</Text>
            <Text style={styles.listItem}>Name</Text>
            <Text style={styles.sumItem}>Cost</Text>
          </View>
          <FlatList
            data={array}
            keyExtractor={item => item.id}
            renderItem={renderItem => {
              return (
                <>
                  <View style={styles.listContainer}>
                    <Text style={styles.dateItem}>
                      {renderItem.item.date.substring(0, 17)}
                    </Text>
                    <Text style={styles.listItem}>{renderItem.item.name}</Text>
                    <Text style={styles.sumItem}>{renderItem.item.cost}</Text>
                  </View>
                  <Text style={styles.timeItem}>
                    {renderItem.item.date.substring(17, 26)}
                  </Text>
                </>
              )
            }}
          />
        </CollapseBody>
      </Collapse>
    </View>
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
  sumItem: {
    alignSelf: 'center',
    flex: 0.5
  },
  dateItem: {
    padding: 5,
    flex: 1,
    paddingBottom: 0
  },
  timeItem: {
    fontSize: 12,
    color: 'grey',
    flexDirection: 'column',
    paddingLeft: 5
  },
  expandIcon: {
    color: 'black'
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  arrowText: {
    color: 'grey',
    paddingTop: 5
  }
})

export default listMonthsExpenses

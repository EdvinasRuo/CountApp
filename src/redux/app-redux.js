import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import moment from 'moment'

import ExpoFileSystemStorage from 'redux-persist-expo-filesystem'
import { persistStore, persistReducer } from 'redux-persist'

// Redux persist
const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage
}

// Initial state
const initialState = {
  favoriteTypes: [],
  searchTypes: [],
  monthsExpenses: [],
  fixedExpenses: [],
  cachedFixedExpenses: [],
  budget: [],
  cachedBudget: []
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setFavoriteTypes':
      return {
        ...state,
        favoriteTypes: [
          ...state.favoriteTypes,
          {
            name: action.value,
            id: Math.random().toString()
          }
        ]
      }
    case 'deleteFavoriteType':
      const filteredFav = state.favoriteTypes.filter(obj => {
        return obj.id !== action.id
      })
      return { ...state, favoriteTypes: filteredFav }
    case 'setSearchTypes':
      return { ...state, searchTypes: [...state.searchTypes, action.value] }
    case 'addExpense':
      return {
        ...state,
        monthsExpenses: [
          ...state.monthsExpenses,
          {
            name: action.name,
            cost: action.cost,
            date: moment().format('llll'),
            month: moment().format('M'),
            year: moment().format('YYYY'),
            id: Math.random().toString()
          }
        ]
      }
    case 'addFixedExpense':
      return {
        ...state,
        fixedExpenses: [
          ...state.fixedExpenses,
          {
            name: action.name,
            cost: action.cost,
            month: moment().format('M'),
            year: moment().format('YYYY'),
            date: moment().format('llll'),
            id: Math.random().toString(),
            fixed: 'true'
          }
        ]
      }
    case 'deleteFixedExpense':
      let cachedCost = {}
      const filteredArray = state.fixedExpenses.filter(expense => {
        if (expense.id == action.id) {
          const extraData = {
            deleteYear: moment().format('YYYY'),
            deleteMonth: moment().format('M')
          }
          const delFixedCost = Object.assign(expense, extraData)
          cachedCost = delFixedCost
        }
        return expense.id !== action.id
      })
      return {
        ...state,
        fixedExpenses: filteredArray,
        cachedFixedExpenses: [...state.cachedFixedExpenses, cachedCost]
      }
    case 'deleteExpense':
      // If months expense
      const filteredMonthsArray = state.monthsExpenses.filter(expense => {
        if (!expense.fixed) {
          return expense.id != action.id
        }
        return expense
      })
      return { ...state, monthsExpenses: filteredMonthsArray }
    case 'addToBudget':
      return {
        ...state,
        budget: [
          ...state.budget,
          {
            name: action.name,
            cost: action.sum,
            month: moment().format('M'),
            year: moment().format('YYYY'),
            date: moment().format('llll'),
            id: Math.random().toString()
          }
        ]
      }
    case 'deleteFromBudget':
      let cachedBudgetItem = {}
      const filteredBudgetArray = state.budget.filter(budgetItem => {
        if (budgetItem.id == action.id) {
          const extraData = {
            deleteYear: moment().format('YYYY'),
            deleteMonth: moment().format('M')
          }
          const delBudget = Object.assign(budgetItem, extraData)
          cachedBudgetItem = delBudget
        }
        return budgetItem.id !== action.id
      })
      return {
        ...state,
        budget: filteredBudgetArray,
        cachedBudget: [...state.cachedBudget, cachedBudgetItem]
      }

    default:
      return state
  }
}

// Store
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
let persistor = persistStore(store)

export { store, persistor }

// Action creators

const setFavoriteTypes = type => {
  return {
    type: 'setFavoriteTypes',
    value: type
  }
}

const deleteFavoriteType = id => {
  return {
    type: 'deleteFavoriteType',
    id: id
  }
}

const setSearchTypes = searchType => {
  return {
    type: 'setSearchTypes',
    value: searchType
  }
}

const addExpense = (name, cost) => {
  return {
    type: 'addExpense',
    name: name,
    cost: cost
  }
}

const addFixedExpense = (name, cost) => {
  return {
    type: 'addFixedExpense',
    name: name,
    cost: cost
  }
}

const deleteFixedExpense = id => {
  return {
    type: 'deleteFixedExpense',
    id: id
  }
}

const deleteExpense = id => {
  return {
    type: 'deleteExpense',
    id: id
  }
}

const addToBudget = (name, sum) => {
  return {
    type: 'addToBudget',
    name: name,
    sum: sum
  }
}

const deleteFromBudget = id => {
  return {
    type: 'deleteFromBudget',
    id: id
  }
}

export {
  setFavoriteTypes,
  setSearchTypes,
  addExpense,
  addFixedExpense,
  deleteFixedExpense,
  deleteFavoriteType,
  deleteExpense,
  addToBudget,
  deleteFromBudget
}

import { combineReducers } from 'redux'
import listReducer from './list'
import usersReducer from './users'

export default combineReducers({
  list: listReducer,
  users: usersReducer,
})

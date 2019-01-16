import { createSelector } from 'reselect'
import uuidv4 from 'uuid/v4'
import faker from 'faker'
import types from '../actions'

const initialState = {
  currentUser: {
    id: uuidv4(),
    name: faker.name.findName(),
    statusId: 5,
  },
  fetchingUserData: false,
}

const userData = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_CURRENT_USER_DATA:
      return {
        ...state,
        fetchingUserData: true,
      }
    case types.STORE_CURRENT_USER_DATA:
      return {
        ...state,
        currentUser: action.payload,
        fetchingUserData: false,
      }
    case types.REQ_CHANGE_STATUS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          statusId: action.payload,
        },
        fetchingUserData: true,
      }
    case types.STORE_CHANGE_STATUS:
      return {
        ...state,
        fetchingUserData: false,
      }
    default:
      return state
  }
}

const currentUser = state => state.userData.currentUser
const fetchingUserData = state => state.userData.fetchingUserData

export const makeGetUserData = () => {
  return createSelector(
    [currentUser, fetchingUserData],
    (currentUser, fetchingUserData) => ({
      currentUser,
      fetchingUserData,
    })
  )
}

export default userData

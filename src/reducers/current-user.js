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
	fetching: false,
}

const userData = (state = initialState, action) => {
	switch (action.type) {
		case types.REQ_CURRENT_USER_DATA:
			return {
				...state,
				fetching: true,
			}
		case types.STORE_CURRENT_USER_DATA:
			return {
				...state,
				currentUser: action.payload,
				fetching: false,
			}
		default:
			return state
	}
}

const currentUser = state => state.userData.currentUser
const fetching = state => state.userData.fetching

export const makeGetUserData = () => {
	return createSelector([currentUser, fetching], currentUser, fetching => ({
		currentUser,
		fetching,
	}))
}

export default userData

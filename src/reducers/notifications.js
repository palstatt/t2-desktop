import { createSelector } from 'reselect'
import types from '../actions'

const initialState = {
	messages: [],
}

const notifications = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_NOTIFICATION:
			return {
				...state,
				messages: [...state.messages, action.payload],
			}
		case types.REMOVE_NOTIFICATION:
			return {
				...state,
				messages: state.messages.filter(message => message.id !== action.id),
			}
		default:
			return state
	}
}

// create selectors
const messages = state => state.notifications.messages

// make memoized business data selector
export const makeGetNotifications = () => {
	return createSelector([messages], messages => ({
		messages,
	}))
}

export default notifications

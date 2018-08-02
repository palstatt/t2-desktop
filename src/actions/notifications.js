import uuidv4 from 'uuid/v4'
import types from './types'

export const addNotification = text => ({
	type: types.ADD_NOTIFICATION,
	payload: {
		id: uuidv4(),
		ts: Date.now(),
		text,
		temporary: true,
	},
})

export const removeNotification = id => ({
	type: types.REMOVE_NOTIFICATION,
	payload: id,
})

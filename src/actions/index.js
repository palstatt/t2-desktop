import uuidv4 from 'uuid/v4'

export const types = {
	ADD_NOTIFICATION: 'ADD_NOTIFICATION',
	REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
}

export const addNotification = text => ({
	type: types.ADD_NOTIFICATION,
	payload: {
		id: uuidv4(),
		ts: Date.now(),
		text,
	},
})

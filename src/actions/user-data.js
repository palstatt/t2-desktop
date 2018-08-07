import types from './types'

export const reqCurrentUserData = () => ({
	type: types.REQ_CURRENT_USER_DATA,
})

export const storeCurrentUserData = userData => ({
	type: types.STORE_CURRENT_USER_DATA,
	payload: userData,
})

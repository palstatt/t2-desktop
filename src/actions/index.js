import uuidv4 from 'uuid/v4'

const types = {
	ADD_NOTIFICATION: 'ADD_NOTIFICATION',
	REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
	REQ_COMPANY_LIST: 'REQ_COMPANY_LIST',
	STORE_COMPANY_LIST: 'STORE_COMPANY_LIST',
}

export const addNotification = text => ({
	type: types.ADD_NOTIFICATION,
	payload: {
		id: uuidv4(),
		ts: Date.now(),
		text,
	},
})

export const removeNotification = id => ({
	type: types.REMOVE_NOTIFICATION,
	id,
})

export const reqCompanyList = () => ({
	type: types.REQ_COMPANY_LIST,
})

export const storeCompanyList = companyList => ({
	type: types.STORE_COMPANY_LIST,
	companyList,
})

export default types

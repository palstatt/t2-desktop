import { combineReducers } from 'redux'
import notifications from './notifications'
import businessData from './business-data'

const reducer = combineReducers({
	notifications,
	businessData,
})

export default reducer

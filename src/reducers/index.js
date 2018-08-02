import notifications from './notifications'
import businessData from './business-data'
import currentUser from './current-user'

export * from './business-data'
export * from './notifications'

const reducer = {
	notifications,
	businessData,
	currentUser,
}

export default reducer

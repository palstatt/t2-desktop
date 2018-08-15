import notifications from './notifications'
import businessData from './business-data'
import userData from './user-data'

export * from './business-data'
export * from './notifications'
export * from './user-data'

const reducer = {
	notifications,
	businessData,
	userData,
}

export default reducer

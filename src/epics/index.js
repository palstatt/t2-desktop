// import { ajax } from 'rxjs/ajax'
import { tap, ignoreElements } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { types } from '../actions'

const addNotificationEpic = action$ =>
	action$.pipe(
		ofType(types.ADD_NOTIFICATION),
		tap(message => console.log(message)),
		ignoreElements()
	)

export const rootEpic = combineEpics(addNotificationEpic)

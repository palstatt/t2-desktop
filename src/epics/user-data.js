import { ajax } from 'rxjs/ajax'
import { tap, ignoreElements, switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import types, * as actions from '../actions'

const apiUrl = route => `${process.env.REACT_APP_API_URL}${route}`

const reqChangeStatus = action$ =>
  action$.pipe(
    ofType(types.REQ_CHANGE_STATUS),
    tap(() => actions.storeChangeStatus()),
    ignoreElements()
  )

const userDataEpics = [reqChangeStatus]

export default userDataEpics

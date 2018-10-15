import { ajax } from 'rxjs/ajax'
import { tap, ignoreElements, switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import types, * as actions from '../actions'
import faker from 'faker'

const apiUrl = route => `${process.env.REACT_APP_API_URL}${route}`

const addNotificationEpic = action$ =>
  action$.pipe(
    ofType(types.ADD_NOTIFICATION),
    tap(message => console.log(message)),
    ignoreElements()
  )

const reqCompanyListEpic = action$ =>
  action$.pipe(
    ofType(types.REQ_COMPANY_LIST),
    switchMap(action =>
      ajax.getJSON(apiUrl('')).pipe(
        map(list => actions.storeCompanyList(list)),
        catchError(error =>
          of(error).pipe(
            map(({ response }) => actions.addNotification(response.error))
          )
        )
      )
    )
  )

const reqChangeStatus = action$ =>
  action$.pipe(
    ofType(types.REQ_CHANGE_STATUS),
    tap(() => actions.storeChangeStatus()),
    ignoreElements()
  )

export const rootEpic = combineEpics(
  addNotificationEpic,
  reqCompanyListEpic,
  reqChangeStatus
)

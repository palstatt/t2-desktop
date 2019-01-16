import { ajax } from 'rxjs/ajax'
import { tap, ignoreElements, switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType } from 'redux-observable'
import types, * as actions from '../actions'

const apiUrl = route => `${process.env.REACT_APP_API_URL}${route}`

const reqCompanyListEpic = action$ =>
  action$.pipe(
    ofType(types.REQ_COMPANY_LIST),
    switchMap(() =>
      ajax.getJSON(apiUrl('/companies/get')).pipe(
        map(list => actions.storeCompanyList(list)),
        catchError(error =>
          of(error).pipe(
            map(({ response }) =>
              actions.addNotification(
                response.error ? response.error.message : ''
              )
            )
          )
        )
      )
    )
  )

const businessDataEpics = [reqCompanyListEpic]

export default businessDataEpics

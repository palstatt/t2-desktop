import { ajax } from 'rxjs/ajax'
import { tap, ignoreElements, switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import types, * as actions from '../actions'

const apiUrl = route => `${process.env.REACT_APP_API_URL}${route}`

const loadIssuesEpic = action$ =>
  action$.pipe(
    ofType(types.REQ_LOAD_ISSUES),
    switchMap(() =>
      ajax.getJSON(apiUrl('/issues/get')).pipe(
        map(issues => actions.successLoadIssues(issues)),
        catchError(error =>
          of(error).pipe(
            map(({ response }) =>
              actions.addNotification(response ? response.message : '')
            )
          )
        )
      )
    )
  )

const issuesEpics = [loadIssuesEpic]

export default issuesEpics

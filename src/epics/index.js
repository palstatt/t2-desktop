import { combineEpics } from 'redux-observable'
import businessDataEpics from './business-data'
import issuesEpics from './issues'
import notificationsEpics from './notifications'
import userDataEpics from './user-data'

export const rootEpic = combineEpics(
  ...businessDataEpics,
  ...issuesEpics,
  ...notificationsEpics,
  ...userDataEpics
)

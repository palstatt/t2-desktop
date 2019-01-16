import { createSelector } from 'reselect'
import types from '../actions'

const initialState = {
  activeIssues: [],
  loading: false,
}

const issues = (state = initialState, action) => {
  switch (action.type) {
    case types.REQ_LOAD_ISSUES:
    case types.REQ_CLAIM_ISSUE:
    case types.REQ_SUBMIT_ISSUE:
    case types.REQ_RESOLVE_ISSUE:
      return {
        ...state,
        loading: true,
      }
    case types.SUCCESS_LOAD_ISSUES:
      return {
        ...state,
        activeIssues: [action.payload],
        loading: false,
      }
    case types.SUCCESS_CLAIM_ISSUE:
      return {
        ...state,
        activeIssues: [...state.activeIssues, action.payload],
        loading: false,
      }
    case types.SUCCESS_SUBMIT_ISSUE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

// create selectors
const activeIssues = state => state.issues.activeIssues

// make memoized business data selector
export const makeGetNotifications = () => {
  return createSelector([activeIssues], activeIssues => ({
    activeIssues,
  }))
}

export default issues

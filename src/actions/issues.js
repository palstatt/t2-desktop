import types from './types'

export const reqLoadIssues = () => ({
  type: types.REQ_LOAD_ISSUES,
})

export const successLoadIssues = payload => ({
  type: types.SUCCESS_LOAD_ISSUES,
  payload,
})

export const errorLoadIssues = payload => ({
  type: types.ERROR_LOAD_ISSUES,
  payload,
})

export const reqSubmitIssue = payload => ({
  type: types.REQ_SUBMIT_ISSUE,
  payload,
})

export const successSubmitIssue = () => ({
  type: types.SUCCESS_SUBMIT_ISSUE,
})

export const errorSubmitIssue = payload => ({
  type: types.ERROR_SUBMIT_ISSUE,
  payload,
})

export const reqClaimIssue = payload => ({
  type: types.REQ_CLAIM_ISSUE,
  payload,
})

export const successClaimIssue = () => ({
  type: types.SUCCESS_CLAIM_ISSUE,
})

export const errorClaimIssue = payload => ({
  type: types.ERROR_CLAIM_ISSUE,
  payload,
})

export const reqResolveIssue = payload => ({
  type: types.REQ_CLAIM_ISSUE,
  payload,
})

export const successResolveIssue = () => ({
  type: types.SUCCESS_RESOLVE_ISSUE,
})

export const errorResolveIssue = payload => ({
  type: types.ERROR_RESOLVE_ISSUE,
  payload,
})

import React from 'react'
import { AutocompleteSearch, InputWithValidation } from 'is-ui-library'

export const reportIssueLabelConfig = {
  default: 'report issue',
  open: 'report issue',
  sending: 'reporting issue',
  complete: 'issue reported',
  error: 'error reporting issue',
}

export const reportIssueFormConfig = (results, searchFunction) => {
  const options = results.slice(0, 10)
  return [
    {
      fieldName: 'company',
      span: 1,
      component: (
        <AutocompleteSearch
          label={'Company'}
          options={options}
          placeholder={'Type to search companies'}
          fetchData={searchFunction}
        />
      ),
      defaultValue: '',
      required: true,
      validation: {
        rules: [
          {
            rule: value => value !== '',
            failureMessage: 'Field is required',
          },
        ],
        prompt: 'Search for company',
      },
    },
    {
      fieldName: 'version',
      span: 1,
      component: (
        <AutocompleteSearch
          label={'Version'}
          options={options}
          placeholder={'Type to search versions'}
          fetchData={searchFunction}
        />
      ),
      defaultValue: '',
      required: true,
      validation: {
        rules: [
          {
            rule: value => value !== '',
            failureMessage: 'Field is required',
          },
        ],
        prompt: 'Search for version number',
      },
    },
    {
      fieldName: 'issue',
      span: 2,
      component: (
        <InputWithValidation
          multiline
          label={'Issue'}
          placeholder={'Type issue description'}
        />
      ),
      defaultValue: '',
      required: true,
      validation: {
        rules: [
          {
            rule: value => value !== '',
            failureMessage: 'Field is required',
          },
        ],
        prompt: 'Type issue details',
      },
    },
  ]
}

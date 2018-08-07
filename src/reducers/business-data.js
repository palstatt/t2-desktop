import { getSearchSelectors } from 'redux-search'
import { createSelector } from 'reselect'
import types from '../actions'

const initialState = {
	companies: [],
	tier2Techs: [],
	currentTech: null,
	fetching: false,
}

const businessData = (state = initialState, action) => {
	switch (action.type) {
		case types.REQ_TECH_LIST:
		case types.REQ_COMPANY_LIST:
			return {
				...state,
				fetching: true,
			}
		case types.STORE_TECH_LIST:
			return {
				...state,
				fetching: false,
				tier2Techs: action.payload,
			}
		case types.STORE_COMPANY_LIST:
			return {
				...state,
				fetching: false,
				companies: action.payload.map(({ id, title, body }) => ({
					id,
					name: title,
					description: body,
				})),
			}
		default:
			return state
	}
}

// create selectors
const companies = state => state.businessData.companies
const tier2Techs = state => state.businessData.tier2Techs

// get redux-search selectors
const { text, result } = getSearchSelectors({
	resourceName: 'companies',
	resourceSelector: (resourceName, state) => state.businessData[resourceName],
})

// make memoized business data selector
export const makeGetBusinessData = () => {
	return createSelector(
		[result, companies, text, tier2Techs],
		(companyIds, companies, searchText, tier2Techs) => ({
			companyIds,
			companies,
			filteredCompanies: companyIds.map(id => companies[id - 1]),
			searchText,
			tier2Techs,
		})
	)
}

export default businessData

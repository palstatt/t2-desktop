import types from './types'

export const reqCompanyList = () => ({
	type: types.REQ_COMPANY_LIST,
})

export const storeCompanyList = companyList => ({
	type: types.STORE_COMPANY_LIST,
	payload: companyList,
})

export const reqTechList = () => ({
	type: types.STORE_TECH_LIST,
})

export const storeTechList = techList => ({
	type: types.STORE_TECH_LIST,
	payload: techList,
})

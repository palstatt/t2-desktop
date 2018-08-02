import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createSearchAction } from 'redux-search'
import { reqCompanyList } from '../actions'
import {
	ButtonForm,
	Drawer,
	CardCollection,
	Columnizer,
	OptionDropdown,
} from 'is-ui-library'
import { makeGetBusinessData } from '../reducers'
import {
	reportIssueFormConfig,
	reportIssueLabelConfig,
	columnizerConfig,
} from '../prop-configs'

const ButtonContainer = styled.div`
	display: grid;
	grid-gap: 16px;
`

const dropdownOptions = [
	{
		label: 'Available',
	},
	{
		label: 'Busy',
	},
	{
		label: 'At lunch',
	},
]

class IssuesPage extends Component {
	handleChange = e => {
		this.setState({ value: e.target.value })
	}

	handleSubmit = (onComplete, onError) => {
		setTimeout(onComplete, 2500)
		// submitData = () => {
		// 	if (success) {
		// 		onComplete
		// 		addSnackMessage(withGoToIssueAction)
		// 	} catch (error) {
		// 		onError
		// 		addSnackMessage(withTrySubmitAgainAction)
		// 	}
		// }
	}

	handleSearch = searchText => {
		this.props.searchCompanies(searchText)
	}

	componentDidMount() {
		this.props.fetchData()
	}

	render() {
		const { filteredCompanies, tier2Techs } = this.props
		return (
			<Fragment>
				<ButtonContainer>
					<ButtonForm
						buttonLabel={reportIssueLabelConfig}
						formName="report_issue"
						formFields={reportIssueFormConfig(
							filteredCompanies,
							this.handleSearch
						)}
						onSubmit={this.handleSubmit}
					/>
					<OptionDropdown
						label="change status"
						theme="default"
						options={dropdownOptions}
						large
					/>
				</ButtonContainer>
				<Drawer
					label={'Tech Status'}
					centeredHeader
					collectionComponent={<CardCollection users={tier2Techs} />}
					collection={tier2Techs}
				/>
				<Columnizer
					navItems={columnizerConfig.navItems}
					pages={columnizerConfig.pages}
				/>
			</Fragment>
		)
	}
}

const makeMapStateToProps = () => {
	const getBusinessData = makeGetBusinessData()
	const mapStateToProps = (state, props) => ({
		...getBusinessData(state, props),
	})
	return mapStateToProps
}

const actions = {
	searchCompanies: createSearchAction('companies'),
	fetchData: reqCompanyList,
}

export default connect(
	makeMapStateToProps,
	actions
)(IssuesPage)

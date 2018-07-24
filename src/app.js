import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSearchAction } from 'redux-search'
import styled from 'styled-components'
import { addNotification, removeNotification, reqCompanyList } from './actions'
import {
	SnackBar,
	ButtonForm,
	Drawer,
	CardCollection,
	Columnizer,
} from 'is-ui-library'
import { UnclaimedCard } from './components'
import { makeGetBusinessData, makeGetNotifications } from './reducers'
import { reportIssueFormConfig, columnizerConfig } from './prop-configs'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: stretch;
	width: 100%;
	height: 100%;
	padding: 16px;

	& > * {
		margin-bottom: 16px;
	}
`

class App extends Component {
	handleChange = e => {
		this.setState({ value: e.target.value })
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.searchCompanies(this.state.value)
	}

	handleSearch = searchText => {
		this.props.searchCompanies(searchText)
	}

	componentDidMount() {
		this.props.addMessage('Test notification')
		this.props.fetchData()
	}

	render() {
		const {
			removeMessage,
			filteredCompanies,
			messages,
			tier2Techs,
		} = this.props
		return (
			<Container>
				<ButtonForm
					buttonLabel="report issue"
					formName="test"
					formFields={reportIssueFormConfig(
						filteredCompanies,
						this.handleSearch
					)}
				/>
				<Drawer
					label={'Tech Status'}
					centeredHeader
					collectionComponent={<CardCollection users={tier2Techs} />}
				/>
				<Columnizer
					navItems={columnizerConfig.navItems}
					pages={columnizerConfig.pages}
				/>
				<UnclaimedCard
					title="Test card"
					description="This is just a test"
					companyName="Test Company"
				/>
				<SnackBar messages={messages} removeMessage={removeMessage} />
			</Container>
		)
	}
}

const makeMapStateToProps = () => {
	const getBusinessData = makeGetBusinessData()
	const getNotifications = makeGetNotifications()
	const mapStateToProps = (state, props) => ({
		...getBusinessData(state, props),
		...getNotifications(state, props),
	})
	return mapStateToProps
}

const actions = {
	searchCompanies: createSearchAction('companies'),
	fetchData: reqCompanyList,
	removeMessage: removeNotification,
	addMessage: addNotification,
}

export default connect(
	makeMapStateToProps,
	actions
)(App)

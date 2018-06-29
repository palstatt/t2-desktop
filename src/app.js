import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addNotification, removeNotification, reqCompanyList } from './actions'
import { Snack, AutocompleteSearch } from 'is-ui-library'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 16px;
`

class App extends Component {
	state = {
		value: '',
	}

	handleChange = e => {
		this.setState({ value: e.target.value })
	}

	componentDidMount() {
		this.props.fetchData()
	}

	render() {
		const { value } = this.state
		const { messages, onRemoveMessage } = this.props
		return (
			<Container>
				<AutocompleteSearch
					value={value}
					onValueChange={/** insert logic for search **/ () => {}}
				/>
				<Snack messages={messages} removeMessage={id => onRemoveMessage(id)} />
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		messages: state.notifications.messages,
	}
}

export default connect(
	mapStateToProps,
	{
		onSubmitMessage: addNotification,
		onRemoveMessage: removeNotification,
		fetchData: reqCompanyList,
	}
)(App)

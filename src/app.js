import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addNotification, removeNotification, reqCompanyList } from './actions'
import { Snack } from 'is-ui-library'

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

	handleSubmit = e => {
		const { onSubmitMessage } = this.props
		e.preventDefault()
		onSubmitMessage(this.state.value)
		this.setState({ value: '' })
	}

	componentDidMount() {
		this.props.fetchData()
	}

	render() {
		const { value } = this.state
		const { messages, onRemoveMessage } = this.props
		return (
			<Container>
				{/* <form onSubmit={this.handleSubmit} autoComplete="off">
					<input
						type="text"
						name="message"
						value={value}
						onChange={e => this.setState({ value: e.target.value })}
					/>
					<input type="submit" disabled={value === ''} />
				</form> */}

				<Snack messages={messages} removeMessage={id => onRemoveMessage(id)} />
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		messages: state.resources.notifications.messages,
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

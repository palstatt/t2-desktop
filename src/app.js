import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { IssuesPage, ResolvedPage } from './pages'
import { makeGetNotifications } from './reducers'
import { removeNotification, addNotification } from './actions'
import { SnackBar, colors, shadows } from 'is-ui-library'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	width: 100%;
	min-height: 100vh;
	padding: 16px;

	& > * {
		margin-bottom: 16px;
	}
`

const TestButton = styled.div`
	background: ${colors.black};
	box-shadow: ${shadows.basic};
	position: fixed;
	bottom: 24px;
	right: 24px;
	height: 80px;
	width: 80px;
	border-radius: 50%;
	cursor: pointer;
`

class App extends Component {
	state = {
		page: 'issues_queue',
	}

	componentDidMount() {
		this.props.addMessage('Test notification')
	}

	render() {
		const { page } = this.state
		const { messages, removeMessage } = this.props
		return (
			<Container>
				{page === 'issues_queue' && <IssuesPage />}
				{page === 'resolved' && <ResolvedPage />}
				<TestButton
					onClick={() =>
						this.setState(prevState => ({
							page:
								prevState.page === 'issues_queue' ? 'resolved' : 'issues_queue',
						}))
					}
				/>
				<SnackBar messages={messages} removeMessage={removeMessage} />
			</Container>
		)
	}
}

const makeMapStateToProps = () => {
	const getNotifications = makeGetNotifications()
	const mapStateToProps = (state, props) => ({
		...getNotifications(state, props),
	})
	return mapStateToProps
}

const actions = {
	removeMessage: removeNotification,
	addMessage: addNotification,
}

export default connect(
	makeMapStateToProps,
	actions
)(App)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IssueCard from '../cards/IssueCard'
import { colors } from 'is-ui-library'

const Container = styled.div`
	background: ${colors.white};
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 8px;

	& > * {
		margin: 8px;
	}
`

const acceptAction = {
	action: () => {
		console.log('main action')
	},
	icon: 'check',
}

export default class CardCollection extends Component {
	state = {
		//
	}

	static propTypes = {
		collection: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.any.isRequired,
				title: PropTypes.string.isRequired,
				reporter: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
				company: PropTypes.string.isRequired,
				mainAction: PropTypes.shape({
					action: PropTypes.func.isRequired,
					icon: PropTypes.string.isRequired,
				}).isRequired,
				footerAction: PropTypes.arrayOf(
					PropTypes.shape({
						action: PropTypes.func.isRequired,
						icon: PropTypes.string.isRequired,
					})
				),
				ts: PropTypes.string.isRequired,
				version: PropTypes.string.isRequired,
			})
		).isRequired,
	}

	static defaultProps = {
		collection: [],
	}

	render() {
		const { collection } = this.props
		return (
			<Container>
				{collection.length > 0 &&
					collection.map(issue => (
						<IssueCard
							key={issue.id}
							title={issue.title}
							reporter={issue.reporter}
							description={issue.description}
							companyName={issue.company}
							mainAction={acceptAction}
							footerAction={[{ key: 1, ...acceptAction }]}
							footerData={[issue.ts, issue.version]}
						/>
					))}
			</Container>
		)
	}
}

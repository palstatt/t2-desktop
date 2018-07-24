import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
	H3,
	Accent,
	InfoField,
	IconButton,
	colors,
	shadows,
} from 'is-ui-library'

const Container = styled.div`
	background: ${colors.white};
	box-shadow: ${shadows.basic};
	position: relative;
	display: flex;
	justify-content: space-between;
	align-content: center;
	padding: 16px;
	border-radius: 4px;
	max-width: 400px;
`

const MainDataContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`

const MainActionContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`

const FooterDataContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`

const FooterActionContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`

const FooterData = styled(Accent)`
	color: ${colors.grey};
`

export default class UnclaimedCard extends Component {
	state = {
		expanded: false,
	}

	static propTypes = {
		title: PropTypes.string.isRequired,
		companyName: PropTypes.string.isRequired,
		mainAction: PropTypes.shape({
			action: PropTypes.func.isRequired,
			icon: PropTypes.string.isRequired,
		}),
	}

	static defaultProps = {
		footerData: [],
		footerAction: [],
	}

	handleExpand = () => {
		this.setState(({ expanded }) => ({ expanded: !expanded }))
	}

	render() {
		const { expanded } = this.state
		const {
			title,
			companyName,
			mainAction,
			footerData,
			footerAction,
		} = this.props
		return (
			<Container onClick={this.handleExpand}>
				<MainDataContainer>
					<H3>{title}</H3>
					<InfoField
						icon="business"
						iconColor={colors.tertiary}
						name={companyName}
						nameColor={colors.grey}
					/>
				</MainDataContainer>
				<MainActionContainer>
					{mainAction && (
						<IconButton
							icon={mainAction.icon}
							onClick={mainAction.action}
							noLabel
							large
						/>
					)}
				</MainActionContainer>
				{expanded && (
					<Fragment>
						<FooterDataContainer>
							{footerData.map(field => <FooterData>{field}</FooterData>)}
						</FooterDataContainer>
						<FooterActionContainer>
							{footerAction.map(action => (
								<IconButton
									icon={action.icon}
									onClick={action.action}
									noLabel
									large
									secondary
								/>
							))}
						</FooterActionContainer>
					</Fragment>
				)}
			</Container>
		)
	}
}

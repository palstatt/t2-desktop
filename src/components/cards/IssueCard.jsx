import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AnimateHeight from 'react-animate-height'
import {
  H3,
  Accent,
  InfoField,
  IconButton,
  colors,
  shadows,
} from 'is-ui-library'

const Container = styled.div`
  background: ${colors.black};
  box-shadow: ${shadows.basic};
  position: relative;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-areas: 'main' 'footer';
  padding: 16px;
  border-radius: 4px;
  min-width: 400px;
  height: auto;
  cursor: pointer;
`

const MainContainer = styled.div`
  grid-area: main;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

const MainDataContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const MainActionContainer = styled.div`
  padding: 4px 0;
  position: relative;
`

const FooterContainer = styled.div`
  position: relative;
  grid-area: footer;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  grid-template-areas: 'footer-data footer-action';
  justify-content: space-between;
  align-items: end;
  align-self: stretch;
`

const FooterDataContainer = styled.div`
  grid-area: footer-data;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  max-width: 224px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FooterActionContainer = styled.div`
  grid-area: footer-action;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  height: 100%;
  & > * {
    margin-left: 8px;
  }
`

const Title = styled(H3)`
	white-space: ${props => (props.expanded ? 'normal' : 'nowrap')};
	color: ${colors.white}
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 8px;
	transition: 0.2s ease;
	max-width: 320px;
`

const MetaDataContainer = styled.div`
  margin-top: 16px;
`

const FooterData = styled(Accent)`
  color: ${colors.grey};
`

export default class IssueCard extends Component {
  state = {
    expanded: false,
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    reporter: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    mainAction: PropTypes.shape({
      action: PropTypes.func.isRequired,
      icon: PropTypes.string.isRequired,
    }),
    footerData: PropTypes.arrayOf(PropTypes.string).isRequired,
    footerAction: PropTypes.arrayOf(
      PropTypes.shape({
        action: PropTypes.func.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
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
      reporter,
      companyName,
      mainAction,
      footerData,
      footerAction,
    } = this.props
    return (
      <Container onClick={this.handleExpand}>
        <MainContainer>
          <MainDataContainer>
            <Title expanded={expanded}>{title}</Title>
            <InfoField
              icon="person"
              iconColor={colors.tertiary}
              name={reporter}
              nameColor={colors.grey}
            />
          </MainDataContainer>
          <MainActionContainer>
            {mainAction && (
              <IconButton
                icon={mainAction.icon}
                onClick={e => {
                  e.stopPropagation()
                  mainAction.action()
                }}
                noLabel
                large
                dark
              />
            )}
          </MainActionContainer>
        </MainContainer>
        <FooterContainer>
          <AnimateHeight height={expanded ? 'auto' : 0} animateOpacity>
            <FooterDataContainer>
              <InfoField
                icon="business"
                iconColor={colors.secondary}
                name={companyName}
                nameColor={colors.grey}
              />
              <MetaDataContainer>
                {footerData.map(field => (
                  <FooterData key={field}>{field}</FooterData>
                ))}
              </MetaDataContainer>
            </FooterDataContainer>
          </AnimateHeight>
          <AnimateHeight height={expanded ? 'auto' : 0} animateOpacity>
            <FooterActionContainer>
              {footerAction.map(action => (
                <IconButton
                  key={action.key}
                  icon={action.icon}
                  onClick={e => {
                    e.stopPropagation()
                    action.action()
                  }}
                  noLabel
                  large
                  secondary
                  dark
                />
              ))}
            </FooterActionContainer>
          </AnimateHeight>
        </FooterContainer>
      </Container>
    )
  }
}

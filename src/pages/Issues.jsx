import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createSearchAction } from 'redux-search'
import { reqCompanyList, reqChangeStatus, addNotification } from '../actions'
import { ButtonForm, Drawer, Columnizer, QuickSwitch } from 'is-ui-library'
import { makeGetBusinessData, makeGetUserData } from '../reducers'
import {
  reportIssueFormConfig,
  reportIssueLabelConfig,
  columnizerConfig,
} from '../prop-configs'
import { statuses, getColor, getTheme, getStatusName } from '../functions'
import { IssueCardCollection, FocusableComponent } from '../components'

const ButtonContainer = styled.div`
  display: grid;
  grid-gap: 16px;
`

const dropdownOptions = statuses.map(({ id, name }) => ({
  id,
  label: name,
  activeColor: getColor(id),
}))

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
    const {
      filteredCompanies,
      tier2Techs,
      currentUser,
      changeStatus,
      addMessage,
    } = this.props
    return (
      <Fragment>
        <ButtonContainer>
          <QuickSwitch
            label={getStatusName(currentUser.statusId)}
            theme={getTheme(currentUser.statusId)}
            columns={2}
            options={dropdownOptions}
            onSelectOption={({ id }) => changeStatus(id)}
            alignOptions={'center'}
            prompt={`I'm currently...`}
            large
          />
          <ButtonForm
            buttonLabel={reportIssueLabelConfig}
            formName="report_issue"
            formFields={reportIssueFormConfig(
              filteredCompanies,
              this.handleSearch
            )}
            onSubmit={this.handleSubmit}
            onComplete={() => addMessage('Your issue was submitted!')}
            onError={() =>
              addMessage('Sorry...there was a problem submitting your issue')
            }
          />
        </ButtonContainer>

        <Drawer
          label={'Tech Status'}
          centeredHeader
          collectionComponent={<IssueCardCollection users={tier2Techs} />}
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
  const getUserData = makeGetUserData()
  const mapStateToProps = (state, props) => ({
    ...getBusinessData(state, props),
    ...getUserData(state, props),
  })
  return mapStateToProps
}

const actions = {
  searchCompanies: createSearchAction('companies'),
  fetchData: reqCompanyList,
  changeStatus: reqChangeStatus,
  addMessage: addNotification,
}

export default connect(
  makeMapStateToProps,
  actions
)(IssuesPage)

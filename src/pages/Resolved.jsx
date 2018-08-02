import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TagText } from 'is-ui-library'
import { changeStatusDropdownConfig } from '../prop-configs'

export default class ResolvedPage extends Component {
	state = {
		//
	}

	static propTypes = {
		//
	}

	render() {
		return (
			<Fragment>
				<TagText options={changeStatusDropdownConfig} />
				{/*  */}
				{/*  */}
			</Fragment>
		)
	}
}

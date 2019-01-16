import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const Scrim = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.75);
`

const ComponentContainer = styled.div`
  position: relative;
`

export default class FocusableComponent extends Component {
  state = {
    focused: false,
  }

  render() {
    const { children } = this.props
    const { focused } = this.state
    return (
      <Fragment>
        {focused ? (
          <Scrim>
            <ComponentContainer>{children}</ComponentContainer>
          </Scrim>
        ) : (
          children
        )}
      </Fragment>
    )
  }
}

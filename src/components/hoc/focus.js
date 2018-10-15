import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const Scrim = styled.div`
  position: fixed;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.75);
`

const focusable = WrappedComponent => {
  return class extends Component {
    state = {
      focused: false,
    }

    handleMouseOver = () => {
      this.setState({ focused: true })
    }

    render() {
      const { focused } = this.state
      return (
        <Fragment>
          {focused && <Scrim />}
          <WrappedComponent
            {...this.props}
            onMouseOver={() => {
              this.handleMouseOver()
              this.props.onMouseOver()
            }}
          />
        </Fragment>
      )
    }
  }
}

export default focusable

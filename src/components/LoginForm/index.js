import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  BackgroundContainer,
  FormContainer,
  Label,
  LoginButton,
} from './styledComponents'
import ColorContext from '../../context/ColorContext'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      showSubmitError,
      errorMsg,
      username,
      password,
      showPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ColorContext.Consumer>
        {value => {
          const {activeBackground} = value
          const websiteLogo = activeBackground
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          return (
            <BackgroundContainer
              className="login-form-container"
              bgColor={activeBackground}
            >
              <FormContainer
                className="form-container"
                onSubmit={this.submitForm}
                bgColor={activeBackground}
              >
                <img
                  src={websiteLogo}
                  className="login-website-logo-desktop-image"
                  alt="website logo"
                />
                <div className="input-container">
                  <Label
                    className="input-label"
                    htmlFor="username"
                    bgColor={activeBackground}
                  >
                    USERNAME
                  </Label>
                  <input
                    type="text"
                    id="username"
                    className="username-input-field"
                    value={username}
                    onChange={this.onChangeUsername}
                    placeholder="Username"
                  />
                </div>
                <div className="input-container">
                  <Label
                    className="input-label"
                    htmlFor="password"
                    bgColor={activeBackground}
                  >
                    PASSWORD
                  </Label>
                  {showPassword && (
                    <input
                      type="text"
                      id="password"
                      className="password-input-field"
                      placeholder="Password"
                      value={password}
                      onChange={this.onChangePassword}
                    />
                  )}
                  {!showPassword && (
                    <input
                      type="password"
                      id="password"
                      className="password-input-field"
                      placeholder="Password"
                      value={password}
                      onChange={this.onChangePassword}
                    />
                  )}
                </div>
                <div className="show-password-container">
                  <input
                    type="checkbox"
                    className="check-box"
                    onClick={this.onClickCheckbox}
                    id="checkbox"
                  />
                  <Label
                    htmlFor="checkbox"
                    className="check-box-label"
                    bgColor={activeBackground}
                  >
                    Show Password
                  </Label>
                </div>
                <LoginButton type="submit">Login</LoginButton>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </FormContainer>
            </BackgroundContainer>
          )
        }}
      </ColorContext.Consumer>
    )
  }
}

export default LoginForm

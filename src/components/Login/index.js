import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userName: '', password: '', showError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    this.setState({showError: false, errorMsg: ''})
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {userName, password} = this.state
    const userDetails = {username: userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {userName, password, showError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1707628267/umuh6zmtkyputcx3j0cj.png"
          alt="login website logo"
          className="website-login-logo"
        />
        <div className="login-form-container">
          <form className="login-form-background" onSubmit={this.onSubmitForm}>
            <div className="website-login-logo-container">
              <img
                src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1707628927/tdpvhy2lcyxvbadbb8es.png"
                alt="website login"
                className="website-login"
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="username" className="form-label">
                Username*
              </label>
              <input
                id="username"
                type="text"
                placeholder="username"
                className="login-form-input"
                value={userName}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="password" className="form-label">
                Password*
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                className="login-form-input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {showError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

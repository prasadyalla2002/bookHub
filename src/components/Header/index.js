import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'
import {GiHamburgerMenu, GiCrossMark} from 'react-icons/gi'
import './index.css'

class Header extends Component {
  state = {activeHome: true, activeShelf: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav className="header-container">
        <div className="nav-content">
          <img
            src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1707628927/tdpvhy2lcyxvbadbb8es.png"
            alt="website logo"
            className="website-logo"
          />
          <Popup
            modal
            trigger={<GiHamburgerMenu className="hamburger-icon" size={30} />}
            position="top"
          >
            {close => (
              <div className="popup-content">
                <Link to="/" className="mobile-link-item">
                  <p className="mobile-link">Home</p>
                </Link>
                <Link to="/shelf" className="mobile-link-item">
                  <p className="mobile-link">Bookshelves</p>
                </Link>
                <button
                  className="mobile-logout-button"
                  type="button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="close-icon"
                  onClick={() => close()}
                >
                  <GiCrossMark size={15} />
                </button>
              </div>
            )}
          </Popup>
          <ul className="desktop-links">
            <Link to="/" className="mobile-link-item">
              <li className="desktop-link">Home</li>
            </Link>
            <Link to="/shelf" className="mobile-link-item">
              <li className="desktop-link">Bookshelves</li>
            </Link>
            <button
              className="desktop-logout-button"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)

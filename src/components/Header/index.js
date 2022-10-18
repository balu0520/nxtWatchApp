import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import {FiSun} from 'react-icons/fi'
import ColorContext from '../../context/ColorContext'
import {
  CustomButton,
  NavHeader,
  PopupContainer,
  PopupHeading,
  CancelButton,
} from './styledComponents'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ColorContext.Consumer>
      {value => {
        const {activeBackground, changeBackground} = value
        const websiteLogo = activeBackground
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

        const onClickBackground = () => {
          changeBackground()
        }

        return (
          <NavHeader className="nav-header" bgColor={activeBackground}>
            <div className="nav-content">
              <div className="nav-bar-large-container">
                <Link to="/">
                  <img
                    className="website-logo"
                    src={websiteLogo}
                    alt="website logo"
                  />
                </Link>
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={onClickBackground}
                      data-testid="theme"
                    >
                      {activeBackground && <FaMoon className="moon-icon" />}
                      {!activeBackground && <FiSun className="sun-icon" />}
                    </button>
                  </li>

                  <li className="nav-menu-item">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="profile-icon"
                    />
                  </li>
                </ul>
                <Popup
                  modal
                  trigger={
                    <CustomButton
                      type="button"
                      className="logout-desktop-btn"
                      onClick={onClickLogout}
                      bgColor={activeBackground}
                    >
                      Logout
                    </CustomButton>
                  }
                  className="popup-container"
                >
                  {close => (
                    <PopupContainer bgColor={activeBackground}>
                      <PopupHeading className="heading">
                        Are you sure, you want to logout
                      </PopupHeading>
                      <div className="buttons-container">
                        <CancelButton onClick={close} type="button">
                          Cancel
                        </CancelButton>
                        <button
                          type="button"
                          className="logout-button"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </PopupContainer>
                  )}
                </Popup>
              </div>
            </div>
          </NavHeader>
        )
      }}
    </ColorContext.Consumer>
  )
}

export default withRouter(Header)

import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {HiFire} from 'react-icons/hi'
import ColorContext from '../../context/ColorContext'
import {
  Container,
  TypesContainer,
  TypesList,
  ListItem,
  TypePara,
  ContactContainer,
  ContactHeading,
  ContactPara,
  HomeContainer,
  NotFoundHeading,
  NotFoundPara,
} from './styledComponents'
import Header from '../Header'
import './index.css'

const NotFound = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const renderNotFoundPage = background => {
    const notFoundImageUrl = background
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
    return (
      <HomeContainer bgColor={background} className="not-found-container">
        <img src={notFoundImageUrl} alt="not found" className="not-found" />
        <NotFoundHeading bgColor={background}>Page Not Found</NotFoundHeading>
        <NotFoundPara bgColor={background}>
          We are sorry, the page you requested could not be found
        </NotFoundPara>
      </HomeContainer>
    )
  }

  return (
    <ColorContext.Consumer>
      {value => {
        const {activeBackground} = value

        return (
          <>
            <Header />
            <Container bgColor={activeBackground}>
              <TypesContainer bgColor={activeBackground}>
                <TypesList bgColor={activeBackground}>
                  <ListItem bgColor={activeBackground}>
                    <AiFillHome className="home-icon" />
                    <TypePara className="home-para" bgColor={activeBackground}>
                      Home
                    </TypePara>
                  </ListItem>
                  <li className="type-list-item">
                    <Link to="/trending" className="list-item">
                      <HiFire className="not-home-icon" />
                      <TypePara bgColor={activeBackground}>Trending</TypePara>
                    </Link>
                  </li>
                  <li className="type-list-item">
                    <Link to="/gaming" className="list-item">
                      <SiYoutubegaming className="not-home-icon" />
                      <TypePara bgColor={activeBackground}>Gaming</TypePara>
                    </Link>
                  </li>
                  <li className="type-list-item">
                    <Link to="/saved-videos" className="list-item">
                      <BiListPlus className="not-home-icon" />
                      <TypePara bgColor={activeBackground}>
                        Saved Videos
                      </TypePara>
                    </Link>
                  </li>
                </TypesList>
                <ContactContainer bgColor={activeBackground}>
                  <ContactHeading bgColor={activeBackground}>
                    CONTACT US
                  </ContactHeading>
                  <div className="contact-icons-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                      className="logo"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                      className="logo"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                      className="logo"
                    />
                  </div>
                  <ContactPara bgColor={activeBackground}>
                    Enjoy!Now to see your channels and recommendations
                  </ContactPara>
                </ContactContainer>
              </TypesContainer>
              {renderNotFoundPage(activeBackground)}
            </Container>
          </>
        )
      }}
    </ColorContext.Consumer>
  )
}

export default NotFound

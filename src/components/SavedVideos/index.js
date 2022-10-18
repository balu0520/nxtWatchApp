import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {AiFillHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import {
  SavedVideosContainer,
  TypesContainer,
  TypesList,
  ListItem,
  TypePara,
  ContactContainer,
  ContactHeading,
  ContactPara,
  SavedContainer,
  NoVideoHeading,
  NoVideoPara,
} from './styledComponents'
import ColorContext from '../../context/ColorContext'
import './index.css'

const SavedVideos = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  const getDateFrom = givenDate => {
    const todayDate = new Date(givenDate)
    return formatDistanceToNow(todayDate)
  }
  return (
    <ColorContext.Consumer>
      {value => {
        const {activeBackground, savedVideoItems} = value
        const load = savedVideoItems.length > 0

        return (
          <>
            <Header />
            <SavedVideosContainer bgColor={activeBackground}>
              <TypesContainer bgColor={activeBackground}>
                <TypesList bgColor={activeBackground}>
                  <li className="type-list-item">
                    <Link to="/" className="list-item">
                      <AiFillHome className="not-home-icon" />
                      <TypePara bgColor={activeBackground}>Home</TypePara>
                    </Link>
                  </li>
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
                  <ListItem bgColor={activeBackground}>
                    <Link to="/saved-videos" className="list-item">
                      <BiListPlus className="home-icon" />
                      <TypePara bgColor={activeBackground}>
                        Saved Videos
                      </TypePara>
                    </Link>
                  </ListItem>
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
                    Enjoy! Now to see your channels and recommendations!
                  </ContactPara>
                </ContactContainer>
              </TypesContainer>
              <SavedContainer
                bgColor={activeBackground}
                data-testid="savedVideos"
              >
                {load && (
                  <div className="saved-videos-container">
                    <div className="saved-videos-tag">
                      <HiFire className="fire-icon" />
                      <h1 className="saved-para">Saved Videos</h1>
                    </div>
                    <ul className="saved-videos">
                      {savedVideoItems.map(eachSaved => (
                        <li className="saved-video-item" key={eachSaved.id}>
                          <img
                            src={eachSaved.thumbnailUrl}
                            alt="video thumbnail"
                            className="saved-thumbnail"
                          />
                          <div className="saved-video-item-description">
                            <NoVideoHeading bgColor={activeBackground}>
                              {eachSaved.title}
                            </NoVideoHeading>
                            <NoVideoPara bgColor={activeBackground}>
                              {eachSaved.channel.name}
                            </NoVideoPara>
                            <NoVideoPara bgColor={activeBackground}>
                              {eachSaved.viewCount} views -
                              {getDateFrom(eachSaved.publishedAt)} ago
                            </NoVideoPara>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {!load && (
                  <div className="no-saved-videos-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                      className="no-saved-logo"
                    />
                    <NoVideoHeading bgColor={activeBackground}>
                      No saved videos found
                    </NoVideoHeading>
                    <NoVideoPara>
                      You can Save your videos while watching them
                    </NoVideoPara>
                  </div>
                )}
              </SavedContainer>
            </SavedVideosContainer>
          </>
        )
      }}
    </ColorContext.Consumer>
  )
}

export default SavedVideos

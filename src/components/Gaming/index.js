import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
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
  GameContainer,
  FailureHeading,
  FailurePara,
  VideoHeading,
  VideoPara,
} from './styledComponents'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  convertDbObjIntoResObj = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  })

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok !== true) {
      this.setState({apiStatus: apiStatusConstants.failure})
    } else {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        videosData: updatedData,
      })
    }
  }

  renderAllVideosSuccessView = background => {
    const {videosData} = this.state

    return (
      <GameContainer bgColor={background} data-testid="gaming">
        <div className="saved-videos-tag">
          <SiYoutubegaming className="fire-icon" />
          <h1 className="saved-para">Gaming</h1>
        </div>
        <ul className="gaming-videos-list">
          {videosData.map(eachVideo => (
            <Link
              to={`videos/${eachVideo.id}`}
              className="nav-link gaming-item"
              key={eachVideo.id}
            >
              <li className="gaming-video-item">
                <img
                  src={eachVideo.thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail-logo"
                />
                <div className="trending-video-container">
                  <VideoHeading bgColor={background}>
                    {eachVideo.title}
                  </VideoHeading>
                  <VideoPara bgColor={background}>
                    {eachVideo.viewCount} Watching Worldwide
                  </VideoPara>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </GameContainer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllVideosFailureView = background => {
    const failureImgUrl = background
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

    return (
      <div className="failure-container">
        <img src={failureImgUrl} alt="failure view" className="failure-icon" />
        <FailureHeading bgColor={background}>
          Oops! Something Went Wrong
        </FailureHeading>
        <FailurePara>
          We are having some trouble to complete your request. Please try again.
        </FailurePara>
        <button type="button" className="retry-btn" onClick={this.getVideos}>
          Retry
        </button>
      </div>
    )
  }

  getAllVideos = background => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllVideosSuccessView(background)
      case apiStatusConstants.failure:
        return this.renderAllVideosFailureView(background)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
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
                    <li className="type-list-item">
                      <Link to="/" className="list-item">
                        <AiFillHome className="not-home-icon" />
                        <TypePara
                          className="home-para"
                          bgColor={activeBackground}
                        >
                          Home
                        </TypePara>
                      </Link>
                    </li>
                    <li className="type-list-item">
                      <Link to="/trending" className="list-item">
                        <HiFire className="not-home-icon" />
                        <TypePara bgColor={activeBackground}>Trending</TypePara>
                      </Link>
                    </li>
                    <ListItem bgColor={activeBackground}>
                      <Link to="/gaming" className="list-item">
                        <SiYoutubegaming className="home-icon" />
                        <TypePara bgColor={activeBackground}>Gaming</TypePara>
                      </Link>
                    </ListItem>
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
                      Enjoy! Now to see your channels and recommendations!
                    </ContactPara>
                  </ContactContainer>
                </TypesContainer>

                {this.getAllVideos(activeBackground)}
              </Container>
            </>
          )
        }}
      </ColorContext.Consumer>
    )
  }
}

export default Gaming

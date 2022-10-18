import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {Redirect, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {GrClose} from 'react-icons/gr'
import {HiSearch, HiFire} from 'react-icons/hi'
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
  HomeContainer,
  InputContainer,
  InputEl,
  SearchButton,
  FailureHeading,
  FailurePara,
  VideoHeading,
  VideoPara,
  BannerContainer,
} from './styledComponents'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    showBanner: true,
    searchInput: '',
    videosData: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getDateFrom = givenDate => {
    const todayDate = new Date(givenDate)
    return formatDistanceToNow(todayDate)
  }

  convertDbObjIntoResObj = channel => ({
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  })

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        channel: this.convertDbObjIntoResObj(eachVideo.channel),
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        videosData: updatedData,
      })
    }
  }

  onCloseBanner = () => {
    this.setState({showBanner: false})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderAllVideosSuccessView = background => {
    const {videosData} = this.state

    if (videosData.length === 0) {
      return (
        <div className="no-videos-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="no-videos-img"
          />
          <FailureHeading bgColor={background}>
            No Search results found
          </FailureHeading>
          <FailurePara bgColor={background}>
            Try different key words or remove search filters
          </FailurePara>
          <button type="button" className="retry-btn" onClick={this.getVideos}>
            Retry
          </button>
        </div>
      )
    }

    return (
      <ul className="videos-list">
        {videosData.map(eachVideo => (
          <Link
            to={`videos/${eachVideo.id}`}
            className="nav-link"
            key={eachVideo.id}
          >
            <li className="video-item" key={eachVideo.id}>
              <img
                src={eachVideo.thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-logo"
              />
              <div className="video-container">
                <img
                  src={eachVideo.channel.profileImageUrl}
                  alt="channel logo"
                  className="channel-logo"
                />
                <div className="video-description-container">
                  <VideoHeading bgColor={background}>
                    {eachVideo.title}
                  </VideoHeading>
                  <VideoPara bgColor={background}>
                    {eachVideo.channel.name}
                  </VideoPara>
                  <VideoPara bgColor={background}>
                    {eachVideo.viewCount} views
                    {this.getDateFrom(eachVideo.publishedAt)} ago
                  </VideoPara>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
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
    const {showBanner, searchInput} = this.state
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
                    <ListItem bgColor={activeBackground}>
                      <Link to="/" className="list-item">
                        <AiFillHome className="home-icon" />
                        <TypePara
                          className="home-para"
                          bgColor={activeBackground}
                        >
                          Home
                        </TypePara>
                      </Link>
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
                      Enjoy! Now to see your channels and recommendations!
                    </ContactPara>
                  </ContactContainer>
                </TypesContainer>
                <HomeContainer bgColor={activeBackground} data-testid="home">
                  {showBanner && (
                    <BannerContainer
                      className="banner-container"
                      data-testid="banner"
                    >
                      <div className="banner-1">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="website-logo"
                        />
                        <p className="banner-heading">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button className="get-it-now" type="button">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        className="close-btn"
                        type="button"
                        onClick={this.onCloseBanner}
                        data-testid="close"
                      >
                        <GrClose />
                      </button>
                    </BannerContainer>
                  )}
                  <div className="home-route-container">
                    <InputContainer bgColor={activeBackground}>
                      <InputEl
                        type="search"
                        className="search-input"
                        onChange={this.onChangeSearch}
                        placeholder="Search"
                        value={searchInput}
                        bgColor={activeBackground}
                      />
                      <SearchButton
                        type="button"
                        bgColor={activeBackground}
                        onClick={this.getVideos}
                        data-testid="searchButton"
                      >
                        <HiSearch className="search-icon" />
                      </SearchButton>
                    </InputContainer>
                    {this.getAllVideos(activeBackground)}
                  </div>
                </HomeContainer>
              </Container>
            </>
          )
        }}
      </ColorContext.Consumer>
    )
  }
}

export default Home

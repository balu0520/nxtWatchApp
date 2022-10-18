import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {AiFillHome, AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {HiFire} from 'react-icons/hi'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import {
  Container,
  VideoItemContainer,
  TypesContainer,
  TypesList,
  TypePara,
  ContactContainer,
  ContactHeading,
  ContactPara,
  VideoDetailsHeading,
  VideoDetailsPara,
  LikeButton,
  DisLikeButton,
  LikePara,
  DisLikePara,
  SaveButton,
  SavePara,
  VideoItemPara,
} from './styledComponents'
import ColorContext from '../../context/ColorContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: [],
    apiStatus: apiStatusConstants.initial,
    likeColor: 'INITIAL',
    dislikeColor: 'INITIAL',
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  onClickLike = () => {
    this.setState({likeColor: 'SUCCESS', dislikeColor: 'INITIAL'})
  }

  onClickDislike = () => {
    this.setState({dislikeColor: 'SUCCESS', likeColor: 'INITIAL'})
  }

  convertDbObjToResObj1 = eachData => ({
    name: eachData.name,
    profileImageUrl: eachData.profile_image_url,
    subscriberCount: eachData.subscriber_count,
  })

  convertDbObjToResObj = eachData => ({
    id: eachData.id,
    title: eachData.title,
    videoUrl: eachData.video_url,
    thumbnailUrl: eachData.thumbnail_url,
    channel: this.convertDbObjToResObj1(eachData.channel),
    viewCount: eachData.view_count,
    publishedAt: eachData.published_at,
    description: eachData.description,
  })

  getDateFrom = givenDate => {
    const todayDate = new Date(givenDate)
    return formatDistanceToNow(todayDate)
  }

  getVideoItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      console.log(data)
      const updatedData = this.convertDbObjToResObj(data.video_details)
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        videoDetails: updatedData,
      })
    }
  }

  renderSuccessView = () => {
    const {videoDetails, likeColor, dislikeColor} = this.state
    const {
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel
    return (
      <ColorContext.Consumer>
        {value => {
          const {savedVideoItems, activeBackground, onClickSave} = value
          const savedItem = savedVideoItems.find(
            eachVideo => eachVideo.id === videoDetails.id,
          )
          const saved = savedItem === undefined ? 'not-saved' : 'saved'
          const result = saved === 'saved' ? 'Saved' : 'Save'
          const onClickSaved = () => {
            onClickSave(videoDetails)
          }
          return (
            <VideoItemContainer
              bgColor={activeBackground}
              data-testid="videoItemDetails"
            >
              <div className="video-player-container">
                <ReactPlayer
                  url={videoUrl}
                  controls
                  className="video-player"
                  width="100%"
                />
              </div>
              <VideoDetailsHeading bgColor={activeBackground}>
                {description}
              </VideoDetailsHeading>
              <div className="video-details-description-container">
                <VideoDetailsPara bgColor={activeBackground}>
                  {viewCount} views - {this.getDateFrom(publishedAt)} ago
                </VideoDetailsPara>
                <ul className="like-list">
                  <li className="like-list-item">
                    <LikeButton
                      type="button"
                      likeClr={likeColor}
                      onClick={this.onClickLike}
                      className="btn"
                    >
                      <AiOutlineLike className="like" />
                      <LikePara likeClr={likeColor}>Like</LikePara>
                    </LikeButton>
                  </li>
                  <li className="like-list-item">
                    <DisLikeButton
                      type="button"
                      dislikeClr={dislikeColor}
                      onClick={this.onClickDislike}
                      className="btn"
                    >
                      <AiOutlineDislike className="like" />
                      <DisLikePara dislikeClr={dislikeColor}>
                        DisLike
                      </DisLikePara>
                    </DisLikeButton>
                  </li>
                  <li className="like-list-item">
                    <SaveButton
                      type="button"
                      saved={saved}
                      onClick={onClickSaved}
                      className="btn"
                    >
                      <BiListPlus />
                      <SavePara saved={saved}>{result}</SavePara>
                    </SaveButton>
                  </li>
                </ul>
              </div>
              <hr className="separator" />
              <div className="description-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="channel-logo"
                />
                <div className="sub-description-container">
                  <VideoItemPara bgColor={activeBackground}>
                    {name}
                  </VideoItemPara>
                  <VideoItemPara bgColor={activeBackground}>
                    {subscriberCount} Subscribers
                  </VideoItemPara>
                  <VideoItemPara bgColor={activeBackground}>
                    {description}
                  </VideoItemPara>
                </div>
              </div>
            </VideoItemContainer>
          )
        }}
      </ColorContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getVideoItem = background => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView(background)
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
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
                      Enjoy !Now to see your channels and recommendations!
                    </ContactPara>
                  </ContactContainer>
                </TypesContainer>
                {this.getVideoItem()}
              </Container>
            </>
          )
        }}
      </ColorContext.Consumer>
    )
  }
}

export default VideoItemDetails

import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ColorContext from './context/ColorContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Replace your code here
class App extends Component {
  state = {activeBackground: true, savedVideoItems: []}

  changeBackground = () => {
    this.setState(prevState => ({
      activeBackground: !prevState.activeBackground,
    }))
  }

  onClickSave = videoItemDetails => {
    const {savedVideoItems} = this.state
    const videoObject = savedVideoItems.find(
      eachVideo => eachVideo.id === videoItemDetails.id,
    )
    if (videoObject === undefined) {
      this.setState(prevState => ({
        savedVideoItems: [...prevState.savedVideoItems, videoItemDetails],
      }))
    } else {
      this.setState(prevState => ({
        savedVideoItems: prevState.savedVideoItems.filter(
          eachItem => eachItem.id !== videoObject.id,
        ),
      }))
    }
  }

  render() {
    const {activeBackground, savedVideoItems} = this.state
    return (
      <ColorContext.Provider
        value={{
          activeBackground,
          changeBackground: this.changeBackground,
          onClickSave: this.onClickSave,
          savedVideoItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ColorContext.Provider>
    )
  }
}

export default App

import {Component} from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-loading-skeleton/dist/skeleton.css'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
import './index.css'

const tabs = [
  {name: 'Mountain', id: 0},
  {name: 'Flowers', id: 1},
  {name: 'Universe', id: 2},
  {name: 'Nature', id: 3},
]

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

class Home extends Component {
  state = {
    activeId: 0,
    apiStatus: apiConstants.initial,
    imageList: [],
    searchInput: '',
    isEnter: false,
  }

  componentDidMount = () => {
    this.getDetails()
  }

  onActive = id => {
    this.setState({activeId: id, searchInput: ''}, this.getDetails)
  }

  getDetails = async () => {
    this.setState({apiStatus: apiConstants.progress})
    const {activeId, searchInput, isEnter} = this.state
    const tabName = isEnter ? searchInput : tabs[activeId].name.toLowerCase()
    const token = 'vbvHqKoEAtjAvNXSsltMWaiQQJJW9K8Tn8FsUmKm36U'
    const url = `https://api.unsplash.com/search/photos?client_id=${token}&query=${tabName}&page=3&per_page=10`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = data.results.map(eachItem => ({
        imageUrl: eachItem.urls.thumb,
        alt: eachItem.alt_description,
        imageId: eachItem.id,
        link: eachItem.links.html,
        username: eachItem.user.instagram_username,
        isPopup: false,
      }))
      setTimeout(() => {
        this.setState({
          apiStatus: apiConstants.success,
          imageList: formattedData,
          isEnter: false,
        })
      }, 800)
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.setState({isEnter: true}, this.getDetails)
    }
  }

  renderFailure = () => (
    <div className="container">
      <p>Something went wrong.</p>
      <button className="tab active" type="button" onClick={this.getDetails}>
        Try Again
      </button>
    </div>
  )

  renderProgress = () => (
    <SkeletonTheme highlightColor="rgb(255, 217, 203)">
      <div className="image-list view-lg">
        {array.map(each => (
          <li className="image-item" key={each}>
            <Skeleton width="180px" height="160px" />
          </li>
        ))}
      </div>
      <div className="image-list view-sm">
        {array.map(each => (
          <li className="image-item" key={each}>
            <Skeleton width="100%" height="200px" />
          </li>
        ))}
      </div>
    </SkeletonTheme>
  )

  mouseEnter = details => {
    this.setState(prevState => ({
      imageList: prevState.imageList.map(eachImg =>
        eachImg.imageId === details.imageId
          ? {...eachImg, isPopup: true}
          : eachImg,
      ),
    }))
  }

  mouseLeave = details => {
    this.setState(prevState => ({
      imageList: prevState.imageList.map(eachImg =>
        eachImg.imageId === details.imageId
          ? {...eachImg, isPopup: false}
          : eachImg,
      ),
    }))
  }

  onClose = details => {
    this.setState(prevState => ({
      imageList: prevState.imageList.map(eachImg =>
        eachImg.imageId === details.imageId
          ? {...eachImg, isPopup: false}
          : eachImg,
      ),
    }))
  }

  renderSuccess = () => {
    const {imageList} = this.state
    return (
      <ul className="image-list">
        {imageList.map(eachImg => (
          <li
            className={`image-item ${eachImg.isPopup ? 'show-details' : ''}`}
            key={eachImg.imageId}
            onMouseEnter={() => this.mouseEnter(eachImg)}
            onMouseLeave={() => this.mouseLeave(eachImg)}
          >
            <img className="image" src={eachImg.imageUrl} alt={eachImg.alt} />
            <div className="image-details">
              <AiOutlineClose
                className="close"
                onClick={() => this.onClose(eachImg)}
              />
              <p className="text">
                <span>Caption: </span>
                {eachImg.alt}
              </p>
              <p className="text place">
                <span>Username: </span>
                {eachImg.username}
              </p>
              <a
                href={eachImg.link}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                View Image
              </a>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.progress:
        return this.renderProgress()
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

<<<<<<< HEAD
  getTabs = eachTab => {
    const {activeId} = this.state
    const lastId = eachTab.id === 3 ? 'last' : ''
    return (
      <button
        className={
          activeId === eachTab.id ? `active tab ${lastId}` : `tab ${lastId}`
        }
        type="button"
        id={eachTab.id}
        onClick={() => this.onActive(eachTab.id)}
        key={eachTab.id}
      >
        {eachTab.name}
      </button>
    )
  }

  render() {
    const {searchInput} = this.state
=======
  render() {
    const {activeId, searchInput} = this.state
>>>>>>> origin/main
    return (
      <div className="app-container">
        <img
          src="https://res.cloudinary.com/dgkw0cxnh/image/upload/v1689784525/riseupp_cb8omi.webp"
          alt="logo"
          className="logo"
        />
        <div className="input-container">
          <input
<<<<<<< HEAD
            placeholder="Search Image and Press Enter"
=======
            placeholder="Search Image"
>>>>>>> origin/main
            type="search"
            value={searchInput}
            onChange={this.onSearch}
            onKeyDown={this.onEnter}
          />
          <AiOutlineSearch className="icon" />
        </div>
        <div className="tab-container">
<<<<<<< HEAD
          {tabs.map(eachTab => this.getTabs(eachTab))}
=======
          {tabs.map(eachTab => (
            <button
              className={activeId === eachTab.id ? 'active tab' : 'tab'}
              type="button"
              id={eachTab.id}
              onClick={() => this.onActive(eachTab.id)}
              key={eachTab.id}
            >
              {eachTab.name}
            </button>
          ))}
>>>>>>> origin/main
        </div>
        <div className="image-container">{this.renderResult()}</div>
      </div>
    )
  }
}
export default Home

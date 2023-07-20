import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
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

class Home extends Component {
  state = {activeId: 0, apiStatus: apiConstants.initial, imageList: []}

  componentDidMount = () => {
    this.getDetails()
  }

  onActive = id => {
    this.setState({activeId: id}, this.getDetails)
  }

  getDetails = async () => {
    this.setState({apiStatus: apiConstants.progress})
    const {activeId} = this.state
    const tabName = tabs[activeId].name.toLowerCase()
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
      }))
      this.setState({apiStatus: apiConstants.success, imageList: formattedData})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderFailure = () => (
    <div className="container">
      <p>Something went wrong.</p>
      <button type="button" onClick={this.getDetails}>
        Try Again
      </button>
    </div>
  )

  renderProgress = () => <p>Progress</p>

  renderSuccess = () => {
    const {imageList} = this.state
    return (
      <ul className="image-list">
        {imageList.map(eachImg => (
          <li className="image-item" key={eachImg.imageId}>
            <img className="image" src={eachImg.imageUrl} alt={eachImg.alt} />
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

  render() {
    const {activeId} = this.state
    return (
      <div className="app-container">
        <img
          src="https://res.cloudinary.com/dgkw0cxnh/image/upload/v1689784525/riseupp_cb8omi.webp"
          alt="logo"
          className="logo"
        />
        <div className="input-container">
          <input placeholder="Search Image" type="search" />
          <AiOutlineSearch className="icon" />
        </div>
        <div className="tab-container">
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
        </div>
        <div className="image-container">{this.renderResult()}</div>
      </div>
    )
  }
}
export default Home

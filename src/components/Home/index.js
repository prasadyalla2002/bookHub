import {Component} from 'react'

import './index.css'

class Home extends Component {
  state = {apiStatus: ''}

  render() {
    return (
      <div className="home-container">
        <h1>Home Route</h1>
      </div>
    )
  }
}

export default Home

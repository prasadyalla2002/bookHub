import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {apiStatus: ''}

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content-container">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
          </div>
        </div>
      </>
    )
  }
}

export default Home

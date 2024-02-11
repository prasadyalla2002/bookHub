import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {apiStatus: ''}

  onClickFindBooks = () => {
    const {history} = this.props

    history.replace('/shelf')
  }

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
            <button
              type="button"
              className="mobile-find-books-button"
              onClick={this.onClickFindBooks}
            >
              Find Books
            </button>
          </div>
          <div className="top-rated-books-container">
            <div className="heading-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <button
                type="button"
                className="desktop-find-books-button"
                onClick={this.onClickFindBooks}
              >
                Find Books
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home

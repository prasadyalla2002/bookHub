import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import TopRatedBook from '../TopRatedBook'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, topRatedBooksData: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const booksData = await response.json()
      const modifiedTopRatedBooksData = booksData.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        coverPic: eachBook.cover_pic,
        authorName: eachBook.author_name,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        topRatedBooksData: modifiedTopRatedBooksData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  topRatedBooksSuccess = () => {
    const {topRatedBooksData} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 786,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {topRatedBooksData.map(eachBook => (
          <TopRatedBook bookDetails={eachBook} key={eachBook.id} />
        ))}
      </Slider>
    )
  }

  onClickTryAgain = () => {
    this.getTopRatedBooks()
  }

  topRatedBooksFailure = () => (
    <div className="home-failure-view">
      <img
        src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1707724710/kvgevpkvcdrcsvxmrcsx.png"
        alt="failure"
        className="home-failure-image"
      />
      <p className="home-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="home-try-again-button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  topRatedBooksLoading = () => (
    <div className="top-rated-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickFindBooks = () => {
    const {history} = this.props

    history.replace('/shelf')
  }

  renderTopRatedBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.topRatedBooksSuccess()
      case apiStatusConstants.failure:
        return this.topRatedBooksFailure()
      case apiStatusConstants.inProgress:
        return this.topRatedBooksLoading()

      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
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
            <ul className="slick-container">{this.renderTopRatedBooks()}</ul>
          </div>
          {apiStatus !== apiStatusConstants.failure && <Footer />}
        </div>
      </>
    )
  }
}

export default Home

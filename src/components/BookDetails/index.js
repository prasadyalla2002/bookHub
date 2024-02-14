import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, bookDetails: []}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const modifiedBookData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        status: data.book_details.read_status,
        title: data.book_details.title,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        bookDetails: modifiedBookData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBookDetailsSuccess = () => {
    const {bookDetails} = this.state
    const {
      coverPic,
      authorName,
      title,
      rating,
      status,
      aboutBook,
      aboutAuthor,
    } = bookDetails

    return (
      <div className="book-details-content">
        <div className="book-cover-info-container">
          <img src={coverPic} alt={title} className="book-details-cover-pic" />
          <div className="book-info-container">
            <h1 className="book-details-title">{title}</h1>
            <p className="book-details-author-name">{authorName}</p>
            <p className="book-details-rating">
              Avg Rating <BsFillStarFill className="book-details-star-icon" />{' '}
              {rating}
            </p>
            <p className="book-details-status">
              status : <span className="book-details-span">{status}</span>
            </p>
          </div>
        </div>
        <hr className="book-details-hr-line" />
        <div className="book-details-about-author-container">
          <h1 className="book-details-about-author-heading">About Author</h1>
          <p className="book-details-about-author-description">{aboutAuthor}</p>
        </div>
        <div className="book-details-about-author-container">
          <h1 className="book-details-about-author-heading">About Book</h1>
          <p className="book-details-about-author-description">{aboutBook}</p>
        </div>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getBookDetails()
  }

  renderBookDetailsFailure = () => (
    <div className="book-details-failure-container">
      <img
        src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1707724710/kvgevpkvcdrcsvxmrcsx.png"
        alt="failure"
        className="book-details-failure-image"
      />
      <p className="book-details-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="book-details-failure-button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailsLoader = () => (
    <div className="book-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailsSuccess()
      case apiStatusConstants.failure:
        return this.renderBookDetailsFailure()
      case apiStatusConstants.inProgress:
        return this.renderBookDetailsLoader()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="book-details-container">
        <Header />
        {this.renderBookDetails()}
        {apiStatus === apiStatusConstants.success && <Footer />}
      </div>
    )
  }
}

export default BookDetails

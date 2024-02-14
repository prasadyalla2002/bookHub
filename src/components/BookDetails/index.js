import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'

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
      <>
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
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-container">
          <div className="book-details-content">
            {this.renderBookDetailsSuccess()}
          </div>
        </div>
      </>
    )
  }
}

export default BookDetails

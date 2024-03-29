import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import TabItem from '../TabItem'
import TabItemDesktop from '../TabItemDesktop'
import Book from '../Book'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookShelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeBookListId: bookshelvesList[0].id,
    searchInput: '',
    booksData: [],
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, activeBookListId} = this.state
    const bookshelfName = bookshelvesList.filter(
      eachType => eachType.id === activeBookListId,
    )
    const shelfName = bookshelfName[0].value

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${shelfName}&search=${searchInput}`
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
      const modifiedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        rating: eachBook.rating,
        status: eachBook.read_status,
        title: eachBook.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        booksData: modifiedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBooksSuccess = () => {
    const {booksData, searchInput} = this.state
    console.log(searchInput)
    const booksDataLength = booksData.length

    return (
      <ul className="bookshelf-books-list">
        {booksDataLength > 0 ? (
          booksData.map(eachBook => (
            <Book key={eachBook.id} bookDetails={eachBook} />
          ))
        ) : (
          <div className="no-books-found-container">
            <img
              src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1707884802/cfyt7mxu37voqwlghntz.png"
              alt="no books found"
              className="no-books-found-img"
            />
            <p className="no-books-found-description">
              {`Your search for ${searchInput} did not find any
              matches.`}
            </p>
          </div>
        )}
      </ul>
    )
  }

  onClickTryAgain = () => {
    this.getBookDetails()
  }

  renderBookshelfLoader = () => (
    <div className="bookshelf-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooksFailure = () => (
    <div className="bookshelf-failure-container">
      <img
        src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1707724710/kvgevpkvcdrcsvxmrcsx.png"
        className="bookshelf-failure-img"
        alt="failure"
      />
      <p className="bookshelf-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="bookshelf-failure-button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderBookshelf = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksSuccess()
      case apiStatusConstants.failure:
        return this.renderBooksFailure()
      case apiStatusConstants.inProgress:
        return this.renderBookshelfLoader()
      default:
        return null
    }
  }

  onChangeTab = tabId => {
    this.setState({activeBookListId: tabId}, this.getBookDetails)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => this.getBookDetails()

  render() {
    const {activeBookListId, apiStatus, booksData, searchInput} = this.state
    const booksDataLength = booksData.length

    return (
      <>
        <Header />
        <div className="book-shelves-container">
          <div className="book-shelves-content">
            <div className="mobile-search-bar-container">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="mobile-books-search-input"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="mobile-search-icon-button"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <h1 className="mobile-bookShelves-heading">Bookshelves</h1>
            <ul className="mobile-books-nav-items">
              {bookshelvesList.map(eachItem => (
                <TabItem
                  key={eachItem.id}
                  tabDetails={eachItem}
                  isActive={activeBookListId === eachItem.id}
                  onChangeTab={this.onChangeTab}
                />
              ))}
            </ul>
            <div className="desktop-nav-links-container">
              <h1 className="desktop-bookShelves-heading">Bookshelves</h1>
              <ul className="desktop-navigation-list">
                {bookshelvesList.map(eachItem => (
                  <TabItemDesktop
                    key={eachItem.id}
                    isActive={activeBookListId === eachItem.id}
                    tabDetails={eachItem}
                    onChangeTab={this.onChangeTab}
                  />
                ))}
              </ul>
            </div>
            <div className="desktop-books-content">
              <div className="desktop-search-books-heading">
                <h1 className="all-books-heading">All Books</h1>
                <div className="desktop-search-container">
                  <input
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                    className="desktop-books-search-input"
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    type="button"
                    className="mobile-search-icon-button"
                    onClick={this.onClickSearch}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
              {this.renderBookshelf()}
              {apiStatus === apiStatusConstants.success &&
                booksDataLength > 0 && <Footer />}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves

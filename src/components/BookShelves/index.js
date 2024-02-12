import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import TabItem from '../TabItem'
import TabItemDesktop from '../TabItemDesktop'
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

class BookShelves extends Component {
  state = {apiStatus: '', activeBookListId: bookshelvesList[0].id}

  render() {
    const {activeBookListId} = this.state

    return (
      <>
        <Header />
        <div className="book-shelves-container">
          <div className="book-shelves-content">
            <div className="mobile-search-bar-container">
              <input
                type="search"
                placeholder="Search"
                className="mobile-books-search-input"
              />
              <div className="mobile-search-icon-container">
                <BsSearch className="search-icon" />
              </div>
            </div>
            <h1 className="mobile-bookShelves-heading">Bookshelves</h1>
            <ul className="mobile-books-nav-items">
              {bookshelvesList.map(eachItem => (
                <TabItem
                  key={eachItem.id}
                  tabDetails={eachItem}
                  isActive={activeBookListId === eachItem.id}
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
                  />
                ))}
              </ul>
            </div>
            <div className="desktop-search-books-heading">
              <h1 className="all-books-heading">All Books</h1>
              <div className="desktop-search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="desktop-books-search-input"
                />
                <div className="mobile-search-icon-container">
                  <BsSearch className="search-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default BookShelves

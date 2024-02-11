import {Component} from 'react'
import Header from '../Header'
import './index.css'

class BookShelves extends Component {
  state = {apiStatus: ''}

  render() {
    return (
      <>
        <Header />
        <div className="Book-shelves-container">
          <h1>BookShelves Route</h1>
        </div>
      </>
    )
  }
}

export default BookShelves

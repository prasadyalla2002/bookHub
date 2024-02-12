import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const Book = props => {
  const {bookDetails} = props
  const {id, title, rating, authorName, status, coverPic} = bookDetails

  return (
    <Link to={`/books/${id}`} className="link-item">
      <li className="bookshelf-book-item">
        <div className="book-cover-container">
          <img src={coverPic} alt={title} className="bookshelf-cover" />
        </div>
        <div className="bookshelf-book-description-container">
          <h1 className="bookshelf-title">{title}</h1>
          <p className="bookshelf-author-name">{authorName}</p>
          <p className="bookshelf-rating">
            Avg Rating{' '}
            <span>
              <BsFillStarFill className="star-icon" /> {rating}
            </span>
          </p>
          <p className="bookshelf-status">
            Status: <span className="bookshelf-span">{status}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default Book

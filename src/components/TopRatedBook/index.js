import {Link} from 'react-router-dom'
import './index.css'

const TopRatedBook = props => {
  const {bookDetails} = props
  const {coverPic, title, id, authorName} = bookDetails

  return (
    <Link to={`/books/${id}`} className="topRatedBook-link">
      <li className="topRatedBook-container">
        <img src={coverPic} alt={title} className="top-rated-book-cover" />
        <p className="top-rated-book-title">{title}</p>
        <p className="top-rated-book-author">{authorName}</p>
      </li>
    </Link>
  )
}

export default TopRatedBook

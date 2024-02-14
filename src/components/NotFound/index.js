import './index.css'

const NotFound = props => {
  const onClickGoToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1707922294/e8ssudn1qfpkceeeeve9.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button
        type="button"
        className="go-back-to-home-btn"
        onClick={onClickGoToHome}
      >
        Go Back to Home
      </button>
    </div>
  )
}

export default NotFound

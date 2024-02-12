import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/shelf" component={BookShelves} />
        <ProtectedRoute exact path="/books/:id" component={BookDetails} />
        <ProtectedRoute exact path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App

import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import HomePage from '../components/pages/HomePage'




class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    )
  }
}


const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(AppRouter)
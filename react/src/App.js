import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import './App.css'
import Demo from './pages/demo'
import Home from './pages/home'
import CrossDomain from './pages/cross-domain'

function App() {
  return (
    <Router>
      <div id="app">
        <Switch>
          <Route path="/demo"><Demo /></Route>
          <Route path="/cross-domain"><CrossDomain /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

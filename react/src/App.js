import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import loadable from '@loadable/component'
import ErrorBoundary from './error-boundary'
import './App.css'

const Demo = loadable(() => import('./pages/demo'))
const Home = loadable(() => import('./pages/home'))
const CrossDomain = loadable(() => import('./pages/cross-domain'))
const PreviewAndDownload = loadable(() => import('./pages/preview-and-download'))

function App() {
  return (
    <Router>
      <div id="app">
        <ErrorBoundary>
          <Switch>
            <Route path="/demo">
              <Demo />
            </Route>
            <Route path="/cross-domain">
              <CrossDomain />
            </Route>
            <Route path="/preview-and-download">
              <PreviewAndDownload />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ErrorBoundary>
      </div>
    </Router>
  )
}

export default App

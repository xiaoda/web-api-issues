import React from 'react'
import {Link} from "react-router-dom"

function Home () {
  return (
    <>
      <h1>Issues</h1>
      <ol>
        <li><Link to="/cross-domain">跨域请求</Link></li>
      </ol>
    </>
  )
}

export default Home

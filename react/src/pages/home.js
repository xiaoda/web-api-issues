import React from 'react'
import {Link} from "react-router-dom"

function Home () {
  return (
    <>
      <h1>Issues</h1>
      <ol>
        <li><Link to="/cross-domain">跨域请求</Link></li>
        <li>请求方法及数据</li>
        <li>响应结果及数据</li>
        <li>Cookie / Token 验证</li>
        <li>请求超时设置</li>
        <li>服务端推送</li>
        <li>文件预览及下载</li>
        <li>安全问题</li>
      </ol>
    </>
  )
}

export default Home

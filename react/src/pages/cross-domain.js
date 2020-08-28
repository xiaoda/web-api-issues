import React from 'react'
import axios from 'axios'
import {
  API_ORIGIN, API_HTTPS_ORIGIN
} from '../utils/const.js'

function CrossDomain (abc) {
  const axiosInstance = axios.create({
    baseURL: `${API_ORIGIN}/cross-domain`
  })
  const axiosHttpsInstance = axios.create({
    baseURL: `${API_HTTPS_ORIGIN}/cross-domain`
  })
  const axiosProxyInstance = axios.create({
    baseURL: '/cross-domain'
  })

  function sendRawRequest () {
    axiosInstance
      .get('/raw')
      .then(res => console.log(res.data))
  }
  function sendAllowAllRequest () {
    axiosInstance
      .get('/allow-all')
      .then(res => console.log(res.data))
  }
  function sendSpecificOriginRequest () {
    axiosInstance
      .get('/specific-origin')
      .then(res => console.log(res.data))
  }
  function sendPutRequest () {
    axiosInstance
      .put('/put')
      .then(res => console.log(res.data))
  }
  function sendDeleteRequest () {
    axiosInstance
      .delete('/delete')
      .then(res => console.log(res.data))
  }
  function sendPutWithPreflight () {
    axiosInstance
      .put('/put-with-preflight')
      .then(res => console.log(res.data))
  }
  function sendDeleteWithPreflight () {
    axiosInstance
      .delete('/delete-with-preflight')
      .then(res => console.log(res.data))
  }
  function sendGetCookieRequest () {
    axiosHttpsInstance
      .get('/get-cookie', {
        withCredentials: true
      })
      .then(res => console.log(res.data))
  }
  function sendSetCookieRequest () {
    axiosHttpsInstance
      .get('/set-cookie', {
        withCredentials: true
      })
      .then(res => console.log(res.data))
  }
  function sendClearCookieRequest () {
    axiosHttpsInstance
      .get('/clear-cookie', {
        withCredentials: true
      })
      .then(res => console.log(res.data))
  }
  function sendWebpackProxyRequest () {
    axiosProxyInstance
      .get('/raw')
      .then(res => console.log(res.data))
  }

  window.JSONPCallback = data => console.log(data)
  function sendJSONPRequest () {
    const url = `${API_ORIGIN}/cross-domain/jsonp?callback=JSONPCallback`
    const script = document.createElement('script')
    script.setAttribute('src', url)
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  return (
    <div>
      <h1>跨域请求</h1>
      <hr />

      <div>
        <h3>未处理的跨域请求</h3>
        <button onClick={sendRawRequest}>raw</button>
        <h4>讨论</h4>
        <ol>
          <li>该请求响应头缺少浏览器允许跨域所必需的信息。</li>
          <li>该请求是否成功发出并到达服务端？可通过服务端在命令行输出的日志查看。</li>
        </ol>
      </div>
      <hr />

      <div>
        <h3>允许所有 Origin 访问的跨域请求</h3>
        <button onClick={sendAllowAllRequest}>allow all</button>
        <h4>讨论</h4>
        <ol>
          <li>该请求响应头包含 Access-Control-Allow-Origin: * 则浏览器允许任何 Origin 的页面获取响应数据。</li>
        </ol>
      </div>
      <hr />

      <div>
        <h3>允许特定 Origin 访问的跨域请求</h3>
        <button onClick={sendSpecificOriginRequest}>specific origin</button>
      </div>
      <hr />

      <div>
        <h3>PUT / DELETE 方法的跨域请求（未支持预检）</h3>
        <button onClick={sendPutRequest}>PUT</button>
        &nbsp;
        <button onClick={sendDeleteRequest}>DELETE</button>
      </div>
      <hr />

      <div>
        <h3>PUT / DELETE 方法的跨域请求（支持预检）</h3>
        <button onClick={sendPutWithPreflight}>PUT with preflight</button>
        &nbsp;
        <button onClick={sendDeleteWithPreflight}>DELETE with preflight</button>
        <h4>讨论</h4>
        <ol>
          <li>该请求接口必须同时支持 OPTIONS 方法访问并在响应头 Access-Control-Allow-Methods 部分指定当前请求方法（PUT 或 DELETE）。</li>
        </ol>
      </div>
      <hr />

      <div>
        <h3>服务端域名的 Cookie 传递</h3>
        <button onClick={sendGetCookieRequest}>get cookie</button>
        &nbsp;
        <button onClick={sendSetCookieRequest}>set cookie</button>
        &nbsp;
        <button onClick={sendClearCookieRequest}>clear cookie</button>
        <h4>讨论</h4>
        <ol>
          <li>请求部分需要设置 withCredentials: true，响应头需要包含 Access-Control-Allow-Credentials: true。</li>
          <li>
            根据最新的 Web 标准及浏览器要求，服务端设置的 cookie 需要被跨域访问时需要同时设置 sameSite=None 及 secure。这意味着服务端接口必须通过 https 访问。
            <a
              href="https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              【参考】
            </a>
          </li>
        </ol>
      </div>
      <hr />

      <div>
        <h3>开发环境接口代理</h3>
        <button onClick={sendWebpackProxyRequest}>webpack proxy</button>
        <h4>讨论</h4>
        <ol>
          <li>本项目由 create-react-app 生成，根据文档在 package.json 添加 proxy 即可实现开发环境接口代理。其最终实现是依靠 Webpack devServer 的 proxy 配置项。</li>
          <li>其它框架的开发环境代理配置方法可查看各框架文档。</li>
        </ol>
      </div>
      <hr />

      <div>
        <h3>JSONP 请求</h3>
        <button onClick={sendJSONPRequest}>JSONP</button>
      </div>

    </div>
  )
}

export default CrossDomain

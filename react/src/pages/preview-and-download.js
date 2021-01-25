import React from 'react'
import {API_ORIGIN} from '../utils/const.js'

function PreviewAndDownload () {
  return (
    <div>
      <h1>文件预览及下载</h1>
      <hr />

      <div>
        <h3>图片</h3>
        <ol>
          <li>
            <a
              href={`${API_ORIGIN}/static/avatar.png`}
              target="_blank"
              rel="noopener noreferrer"
            >图片预览</a>
          </li>
          <li>
            <a
              href={`${API_ORIGIN}/download/avatar.png`}
              target="_blank"
              rel="noopener noreferrer"
            >图片下载（Content-Disposition 响应头）</a>
          </li>
          <li>
            <a href="/avatar.png" download>图片下载（&lt;a&gt;标签 download 属性）</a>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default PreviewAndDownload

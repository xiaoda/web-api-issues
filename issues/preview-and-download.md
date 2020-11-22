# 文件预览及下载

## Description
浏览器在访问不同类型的文档时往往会采取不同的行为（主要以 Content-Type 作为依据）。浏览器会对 html 文档进行渲染并展示、对图片及 pdf 文件解析并显示、对视频及音频文件进行播放、对 Office 文件及压缩文件进行下载等等。一般来说，对于常见或能够解析的文档浏览器会进行展示或播放，对于不常见或不能解析的文档浏览器会进行下载。前端开发工作中常见的需求之一就是自由设定文档的打开或下载。

#### Points
1. 一般来说，预览功能的实现相对简单，新建浏览器窗口访问 URL 即可。但实际开发中需要预览的 URL 往往是通过后端接口获取的，等 AJAX 请求返回后再新建浏览器窗口会被浏览器拒绝，原因是新建窗口和用户操作的时间间隔太长，被浏览器认为是骚扰行为。解决办法是先新建浏览器窗口，等 AJAX 请求返回后再执行跳转。

## Solutions

### Content-Disposition 响应头
在常规的 HTTP 响应中，Content-Disposition 响应头指示回复的内容该以何种形式展示，是以内联的形式（即网页或者页面的一部分），还是以附件的形式下载并保存到本地。

在 HTTP 场景中，第一个参数或者是 inline（默认值，表示回复中的消息体会以页面的一部分或者整个页面的形式展示），或者是 attachment（意味着消息体应该被下载到本地；大多数浏览器会呈现一个“保存为”的对话框，将 filename 的值预填为下载后的文件名，假如它存在的话）。

```
Content-Disposition: inline
Content-Disposition: attachment
Content-Disposition: attachment; filename="filename.jpg"
```

#### Points
1. Content-Type: application/force-download 响应头也能使浏览器下载当前文件，但这种方式实际上是服务端对浏览器的一种欺骗，因此不建议使用。

#### Reference
1. [Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition) by MDN
2. [Utility of HTTP header “Content-Type: application/force-download” for mobile?
](https://stackoverflow.com/questions/10615797/utility-of-http-header-content-type-application-force-download-for-mobile) by Stack Overflow

---

### \<a> 标签 download 属性
download 属性指示浏览器下载 URL 而不是导航到它，因此将提示用户将其保存为本地文件。如果属性有一个值，那么此值将在下载保存过程中作为预填充的文件名（如果用户需要，仍然可以更改文件名）。

#### Points
1. download 属性仅适用于同源 URL 或 blob: 以及 data: 协议。
2. 在某些场景下可使用 JS 实时创建带有 download 属性的 \<a> 标签并模拟点击实现动态下载。

#### Reference
1. [\<a>超链接标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) by MDN

## Demo
- [local demo](http://localhost:3721/preview-and-download)

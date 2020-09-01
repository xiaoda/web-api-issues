# 请求方法及数据

## Description
HTTP 定义了一组请求方法，以表明要对给定资源执行的操作。虽然他们也可以是名词，但这些请求方法有时被称为 HTTP 动词。每一个请求方法都实现了不同的语义，但有共同的特征。

#### Reference
1. [HTTP 请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods) by MDN

## Methods

### GET
HTTP GET 方法请求指定的资源。使用 GET 的请求应该只用于获取数据。

| Feature | |
| --- | --- |
| 是否有请求体（request body） | 否 |
| 成功的响应是否有响应体（response body） | 是 |
| 安全 | 是 |
| 幂等 | 是 |
| 可缓存 | 是 |
| HTML 表单是否支持 | 是 |

#### Points
1. GET 请求携带的参数会拼接在 URL 上，特殊字符需要转义。
2. GET 请求理论上可以包含请求体（request body），我们可以通过 Postman 等工具成功发出带有请求体的 GET 请求，后端接口也可以接收到数据。但 Web 标准不建议这么做，一些服务器软件在处理和转发请求时可能会丢弃 GET 请求的请求体，Axios 等 HTTP 请求库也不支持这个功能。[【参考】](https://my.oschina.net/airship/blog/3081424)
3. GET 请求因为一些客观因素（浏览器打开链接默认是 GET 请求；GET 请求通过 URL 携带参数）成为最容易受到攻击的请求方式。

#### Reference
1. [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) by MDN

---

### POST
HTTP POST 方法 发送数据给服务器. 请求主体的类型由 Content-Type 首部指定.

PUT 和POST方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用）。连续调用同一个POST可能会带来额外的影响，比如多次提交订单。

| Feature | |
| --- | --- |
| 是否有请求体（request body） | 是 |
| 成功的响应是否有响应体（response body） | 是 |
| 安全 | 否 |
| 幂等 | 否 |
| 可缓存 | 仅当包含有效时间信息时 |
| HTML 表单是否支持 | 是 |

#### Points
1. POST 请求携带的数据有 4 种常见的 content-type，分别是：application/json、application/x-www-form-urlencoded、multipart/form-data 和 text/xml。[【参考】](https://imququ.com/post/four-ways-to-post-data-in-http.html)

#### Reference
1. [POST](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST) by MDN

---

### PUT
HTTP PUT 请求方法使用请求中的负载创建或者替换目标资源。

PUT 与 POST 方法的区别在于，PUT方法是幂等的：调用一次与连续调用多次是等价的（即没有副作用），而连续调用多次POST方法可能会有副作用，比如将一个订单重复提交多次。

| Feature | |
| --- | --- |
| 是否有请求体（request body） | 是 |
| 成功的响应是否有响应体（response body） | 否 |
| 安全 | 否 |
| 幂等 | 是 |
| 可缓存 | 否 |
| HTML 表单是否支持 | 否 |

#### Reference
1. [PUT](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT) by MDN

---

### DELETE
HTTP DELETE 请求方法用于删除指定的资源。

| Feature | |
| --- | --- |
| 是否有请求体（request body） | 可以有 |
| 成功的响应是否有响应体（response body） | 可以有 |
| 安全 | 否 |
| 幂等 | 是 |
| 可缓存 | 否 |
| HTML 表单是否支持 | 否 |

#### Reference
1. [DELETE](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/DELETE) by MDN

## RESTful API
REST 全称是 Representational State Transfer，中文意思是表述性状态转移。它首次出现在 2000 年 Roy Fielding 的博士论文中，Roy Fielding 是HTTP规范的主要编写者之一。

REST 本身并没有创造新的技术、组件或服务，而隐藏在 RESTful 背后的理念就是使用 Web 的现有特征和能力，更好地使用现有 Web 标准中的一些准则和约束。虽然 REST 本身受 Web 技术的影响很深， 但是理论上 REST 架构风格并不是绑定在 HTTP 上，只不过目前 HTTP 是唯一与REST相关的实例。

| 请求方法 | 功能 |
| --- | --- |
| GET | SELECT, 从服务器取出资源（一项或多项）|
| POST | CREATE, 在服务器新建一个资源 |
| PUT | UPDATE, 在服务器更新资源（客户端提供改变后的完整资源） |
| PATCH | UPDATE, 在服务器更新资源（客户端提供改变的属性） |
| DELETE | DELETE, 从服务器删除资源 |
| HEAD | 获取资源的元数据 |
| OPTIONS | 获取信息，关于资源的哪些属性是客户端可以改变的 |

#### Reference
1. [RESTful API 设计指南](https://www.ruanyifeng.com/blog/2014/05/restful_api.html) by 阮一峰

## Request Header
请求头是 HTTP 头的一种，它可在 HTTP 请求中使用，并且和请求主体无关 。某些请求头如 Accept、Accept-*、 If-* 允许执行条件请求。某些请求头如：Cookie, User-Agent 和 Referer 描述了请求本身以确保服务端能返回正确的响应。

并非所有出现在请求中的 HTTP 首部都属于请求头，例如在 POST 请求中经常出现的 Content-Length 实际上是一个代表请求主体大小的 entity header，虽然你也可以把它叫做请求头。

此外，CORS 定义了一个叫做 simple headers 的集合，它是请求头集合的一个子集。如果某次请求是只包含 simple header 的话，则被认为是简单请求，不会触发请求预检（preflight）。

#### Points
1. 从浏览器发出的请求会由浏览器添加默认请求头，例如：Host, Origin, Referer, Cookie, Cache-Control, Accept-Language, User-Agent 等。由服务端或脚本发起的请求往往没有默认的请求头，但想要伪造也不难。

#### Reference
1. [Request header（请求头）](https://developer.mozilla.org/zh-CN/docs/Glossary/%E8%AF%B7%E6%B1%82%E5%A4%B4) by MDN
2. [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) by MDN

## Request body
Waiting to be added..

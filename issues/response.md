# 响应结果及数据

## HTTP Response Status Code
HTTP 响应状态代码指示特定 HTTP 请求是否已成功完成。响应分为五类：信息响应(100–199)，成功响应(200–299)，重定向(300–399)，客户端错误(400–499)和服务器错误 (500–599)。状态代码由 section 10 of RFC 2616定义

#### 常见状态码

| Status Code | Status Text | Meaning |
| --- | --- | --- |
| 200 | OK | 请求成功 |
| 301 | Moved Permanently | 被请求的资源已永久移动到新位置 |
| 302 | Found | 请求的资源现在临时从不同的 URI 响应请求 |
| 304 | Not Modified | 文档的内容（自上次访问以来或者根据请求的条件）并没有改变 |
| 400 | Bad Request | 请求参数有误 |
| 401 | Unauthorized | 当前请求需要用户验证 |
| 403 | Forbidden | 服务器已经理解请求，但是拒绝执行它。 |
| 404 | Not Found | 请求失败 |
| 405 | Method Not Allowed | 请求行中指定的请求方法不能被用于请求相应的资源 |
| 500 | Internal Server Error | 服务器遇到了不知道如何处理的情况 |
| 502 | Bad Gateway | 服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。 |
| 503 | Service Unavailable | 服务器没有准备好处理请求 |
| 504 | Gateway Timeout | 当服务器作为网关，不能及时得到响应时返回此错误代码。 |

#### Points
1. HTTP 状态码和响应体数据都可以用来通知请求结果，相比之下 HTTP 状态码是更直接、更符合标准的方式。

#### Reference
1. [HTTP 响应代码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status) by MDN

## Response Header
响应头可以定义为：被用于 HTTP 响应中并且和响应消息主体无关的那一类 HTTP header。像 Age, Location 和 Server 都属于响应头，他们被用于描述响应。

并非所有出现在响应中的 HTTP header 都属于响应头，例如 Content-Length 就是一个代表响应体消息大小的 entity header，虽然你也可以把它叫做响应头。

#### Points
1. 从服务器软件（如 Nginx）返回的请求会由服务器软件添加默认响应头。这些响应头输出了服务器的相关信息，因此存在一定安全隐患。
2. 服务端设置 Cookie 通过响应头里的 Set-Cookie 告诉浏览器并执行。

#### Reference
1. [Response header 响应头](https://developer.mozilla.org/zh-CN/docs/Glossary/Response_header) by MDN
2. [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) by MDN

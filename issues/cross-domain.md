# 跨域请求

## Description
同源策略是一个重要的安全策略，它用于限制一个 origin 的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

#### Points
1. 同源策略要求非常严格，必须网页地址和接口地址的协议、域名、端口完全一致。
2. 同源策略是浏览器执行的安全策略，具体表现是在浏览器端可以发出跨域请求，但响应的数据遭到浏览器拦截因此页面获取不到。

#### Reference
1. [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy) by MDN

## Solutions

### 跨域资源共享（CORS）
跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器，让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

#### Points
1. 为安全考虑，正式环境的接口响应头 Access-Control-Allow-Origin 应指定授权的 Origin，防止未授权第三方网站访问。
2. 为方便开发，开发环境的接口响应头 Access-Control-Allow-Origin 可以设置为 * 或请求头里的 Origin。
3. 规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。[【参考】](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E5%8A%9F%E8%83%BD%E6%A6%82%E8%BF%B0)
4. XMLHttpRequest 或 Fetch 与 CORS 的一个有趣的特性是，可以基于  HTTP cookies 和 HTTP 认证信息发送身份凭证。一般而言，对于跨域 XMLHttpRequest 或 Fetch 请求，浏览器不会发送身份凭证信息。如果要发送凭证信息，需要设置 XMLHttpRequest 的某个特殊标志位。[【参考】](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)
5.[Cookie SameSite 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite) 必须设置为 None，易受 CSRF 攻击。

#### Response Header
```
Access-Control-Allow-Origin: frontend.anchnet.com
```

#### Reference
1. [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)by MDN
2. [跨域资源共享 CORS 详解](https://www.ruanyifeng.com/blog/2016/04/cors.html) by 阮一峰

---

### 反向代理
反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以获得目标服务器的资源。同时，用户不需要知道目标服务器的地址，也无须在用户端作任何设定。

利用反向代理可以将原本直接从前端发往后端服务器的请求改造成前端先向前端服务器发起请求、再由前端服务器向后端服务器发起请求的方式，原本的一次直接请求变成经过中介的两次请求。最终在浏览器端显示为同域请求，避免了跨域请求的麻烦。

#### Points
1. 使用 Webpack 构建的前端项目可通过 devServer 的 proxy 配置项实现本地开发环境的接口代理。[【参考】](https://webpack.js.org/configuration/dev-server/#devserverproxy)
2. 正式环境或测试环境的前端项目可使用 Nginx 实现接口的反向代理。[【参考】](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
3. Next 或 Nuxt 等 SSR 框架搭建的前端 / 全栈项目因为包含 node 服务器所以可以在 node 层处理接口代理。
4. 使用反向代理方式解决跨域问题，后端接口不需要做任何调整。

#### Webpack Config
``` javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://api.anchnet.com'
    }
  }
}
```

#### Nginx Config
```
location /api {
    proxy_pass http://api.anchnet.com

    # 设置 Host 头，非必须
    proxy_set_header Host $host;

    # https 访问时传递 Server Name，非必须
    proxy_ssl_server_name on;

    # 阻止代理跳转，非必须
    proxy_redirect off;
}

location /socket {
    proxy_pass http://socket.anchnet.com;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
}
```

#### Reference
1. [反向代理](https://baike.baidu.com/item/%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86) by 百度百科

---

### JSONP
JSONP 是一种非正式传输协议，该协议的一个要点就是允许用户传递一个 callback 参数给服务端，然后服务端返回数据时会将这个 callback 参数作为函数名来包裹住 JSON 数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

#### Points
1. 手动发起 JSONP 请求前需要定义好回调函数，若使用工具（如 jQuery）发起 JSONP 请求则工具会代为操作。
2. 浏览器发出的 JSONP 请求不会出现在 Chrome 调试工具 Network 菜单的 XHR 类型里，而是出现在 JS 类型下。这是因为 JSONP 虽然像 AJAX 一样做到前后端数据交换、并且被我们当成类似 XHR 的存在，但它的本质仍然是 JS 文件。
3. JSONP 跟 AJAX 相比有一个明显的缺陷，就是只能发起 GET 类型的请求。

#### Reference
1. [JSONP跨域详解](https://www.jianshu.com/p/e1e2920dac95) by 公子七

## Demo
- [local demo](http://localhost:3721/cross-domain)

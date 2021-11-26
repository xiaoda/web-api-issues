# Web 安全

## 常见攻击方式
### XSS（跨站脚本攻击）
1. 目的是在第三方站点执行恶意脚本，获取用户的敏感信息如 Cookie / Token 等。
2. 使用前端框架如 React / Vue 可系统性避免（自动转义），避免使用 v-html / dangerouslySetInnerHTML。
3. 避免使用 [JS eval 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)

### CSRF（跨站请求伪造）
1. 目的是在第三方站点冒用用户的登录凭证（Cookie），发起伪造的请求。
2. 攻击者不能获取到受害者的登录凭证，仅仅是冒用。
3. [Cookie SameSite 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite) 可防止 CSRF 攻击（前后端同域网站）。
4. 增加 CSRF_Token 校验（尤其是允许跨域请求的情况）
5. Get 请求不可用于修改数据

### SQL 注入
1. 目的是获取数据库权限盗取或更改数据
2. 需要对用户输入内容进行过滤
3. 使用框架封装的数据库查询方法，不要拼接 SQL 语句。

### DDoS（分布式拒绝服务攻击）
1. 目的是使站点无法访问
1. 当网站无法及时响应并且 SSH 连接不上时，应查看该服务器的监控数据（特别是入流量）来判断是否遭受 DDoS 攻击。

## 安全隐患
### Get 请求
由于浏览器访问网页和资源默认使用 Get 请求，并且 Get 请求通过 URL 携带参数，因此 Get 请求成为最容易受到攻击的请求方式。

### Token 可读
存在 HttpOnly Cookie 的 Token 不可读；其它前端缓存里的 Token 可读。

### 跨域请求
跨域请求由于需要设置 SameSite=None 易受 CSRF 攻击，需要配合 CSRF Token 进行防护。

### 连续 ID
非技术隐患，暴露业务信息。建议使用 Hash ID。

## 常见防护措施
### 后端校验更重要
1. 任何前端请求都有可能被伪造，客户端 JS 脚本都能被第三方获取，因此前端请求是不可信的，前端加密是无效的。所有加密及验证过程都应在服务端完成。
2. 前端校验以提升用户体验为主

### HTTPS 加密访问
防止中间人攻击，依赖于浏览器。

### Referer 限制
校验当前请求的来源页面地址

### CSRF_Token 校验
专门校验当前请求是否合法的 Token

### 特殊字符转义
有效阻止 XSS / SQL 注入等攻击

### 避免服务器信息暴露
1. 避免泄露服务器环境信息
2. 避免泄露服务器细节错误信息

### CDN 资源文件完整性校验
1. CDN 的样式 / 脚本文件默认不可信
2. 使用 [Subresource Integrity](https://developer.mozilla.org/zh-CN/docs/Web/Security/%E5%AD%90%E8%B5%84%E6%BA%90%E5%AE%8C%E6%95%B4%E6%80%A7) 进行完整性校验

### 反爬虫
节省带宽流量，对抗竞争对手。

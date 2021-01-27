# Cookie / Token 验证

## Cookie
1. 仅适用于浏览器端
3. Cookie 通过 Request / Response Header 发送和接收
2. 自动发送和接收，前端几乎无感知。
4. 跨域情况下前后端 Cookie 项无法共用
5. [Secure 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies#%E9%99%90%E5%88%B6%E8%AE%BF%E9%97%AE_cookie) 只通过加密请求传输
6. [HttpOnly 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies#%E9%99%90%E5%88%B6%E8%AE%BF%E9%97%AE_cookie) 防止通过 JS 读取或修改
7. [SameSite 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite) 防止 CSRF 攻击（前后端同域网站）

## Token
1. 适用于几乎所有终端，包括浏览器、小程序、App 等。
2. 手动接收、存储和发送
3. 免疫 CSRF 攻击

## Comparison
1. Token 相对原始，Cookie 相对高级，Cookie 像经过封装的 Token 功能。
2. Token 是更适合多终端的验证方案。

## Reference
1. [彻底弄懂 session，cookie，token](https://segmentfault.com/a/1190000017831088) by 心难收

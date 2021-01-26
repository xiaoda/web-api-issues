# 服务端推送

## AJAX 轮询
客户端按规定时间定时像服务端发送 AJAX 请求，服务器接到请求后马上返回响应信息并关闭连接。

还有一种长轮询是在 AJAX 轮询基础上做的一些改进，在没有更新的时候不再返回空响应。客户端向服务器发送 AJAX 请求，服务器接到请求后 hold 住连接，直到有新消息才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的请求。

### Points
1. 简单，无需复杂模块。
2. 效率低下，增加服务器压力。

### Reference
1. [web 服务器端推送技术简介](https://www.w3ctech.com/topic/1754) by zhangchen2397

## WebSocket
WebSocket 是 HTML5 开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议。它基于TCP传输协议，并复用HTTP的握手通道。WebSocket的出现，使得浏览器具备了实时双向通信的能力。

### Points
1. 推荐使用相关框架 / 库如 SocketIO，不直接操作底层 API。
2. 客户端之间的推送功能，仅需借助后端实现，数据可在前端管理。

### Reference
1. [WebSocket协议：5分钟从入门到精通](https://www.cnblogs.com/chyingp/p/websocket-deep-in.html) by 程序猿小卡
2. [WebSocket 是什么原理？为什么可以实现持久连接？](https://www.zhihu.com/question/20215561) by Ovear
3. [协议升级机制](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Protocol_upgrade_mechanism) by MDN

## SSE (Server Sent Events)
严格地说，HTTP 协议无法做到服务器主动推送信息。但是，有一种变通方法，就是服务器向客户端声明，接下来要发送的是流信息（streaming）。

也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。

### Reference
1. [Server-Sent Events 教程](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html) by 阮一峰
2. [使用服务器发送事件](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events) by MDN

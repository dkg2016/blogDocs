# Cookie
* [MDN 上的 Cookie](https://developer.mozilla.org/zh-CN/docs/web/http/headers/cookie)
* 用于在客户端存储会话信息，用来和 server 端通讯
* 与特定域绑定，只对被认可的接收者开放，不被其他域访问
* 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能

## 构成
1. 组成
  * 键值对构成的字符串
  * 每个键值对之间用分号 ; 分割
  * 属性设置，之间用分号和空格隔开  
  ` name=value; expires=Sat, 08 Sep 2018 02:26:00 GMT; domain=xyz.com; path=/; secure; HttpOnly `
2. name, 名称
   1. 唯一标识 cookie 的名称
   2. 不区分大小写
3. value, 值
   1. 存储在 cookie 里面的字符串值
   2. 这个值必须经过 URL 编码
4. Domain, 域
   1. cookie 有效的域
   2. 发送到这个域的所有请求都会携带对应的 cookie
   3. 这个值可能包含子域（如 www.example.com）,也可以不包含(如 .example.com 表示对 wrox.com 的所有子域都有效)
   4. 如果不明确设置，则默认为设置 cookie 的域
   5. Domin 是域名，Path 是路径，两者一起来限制 cookie 能被哪些 URL 访问
   6. 若请求的 URL 是 Domin 或其子域，且 URL 的路径是 Path 或子路径，则就可以访问此 cookie
   7. 跨域请求，默认不携带 cookie
5. 路径, path
   1. 请求 URL 中包含这个路径才会把 cookie 发送到服务器
   2. 设置 ` Path=/docs `, 则以下地址都会匹配
      1. /docs
      2. /docs/Web/
      3. /docs/Web/HTTP
6. Expires、Max Age，过期时间
   1. 表示何时删除 cookie 的时间戳(即什么时间之后就不发送到服务器了)
   2. 默认情况下，浏览器会话结束后会删除所有 cookie。不过，也可以设置删除 cookie 的时间
   3. 把过期时间设置为过去的时间会立即删除 cookie
   4. Expires，cookie 的失效时间，GMT格式的时间
   5. Max Age，以秒为单位的时间段，默认-1，会话结束即失效
   6. 若不指定，默认为浏览器关闭前为止
7. secure, 安全标志
   1. 设置之后，只在使用 SSL 安全连接的情况下才会把 cookie 发送到服务器
   2. secure 属性用来设置 cookie 只有在确保安全的请求中才会发送。即当请求是 https 或者其它安全协议时，包含 secure 属性的 cookie 才会被发送到服务器
   3. ` Set-Cookie: name=value; secure`
8. HttpOnly
   1. 只能在服务器上读取, JavaScript 无法取得这种 cookie 的值
   2. 设置 cookie 是否能通过 js 去访问
   3. 当 cookie 携带 httpOnly 属性时，客户端无法通过 js 代码去访问（读取、修改、删除）这个 cookie
   4. 减少 XSS 攻击
9. SameSite
   1. 允许服务器要求某个 cookie 在跨站请求时不会被发送
   2. 不能在跨域请求中携带 cookie
   3. 减少跨站请求伪造(CSRF) 攻击
   4. 三种值： 
      1. None，SameSite 为 None，则必须设置 Secure 属性
      2. Strict，最严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie
      3. Lax： 大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求（链接，预加载请求，GET 表单）除外
   5. [Cookie 的 SameSite 属性](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)

## 使用
1. 设置 ` document.cookie ` 不会覆盖之前存在的任何 cookie，除非设置了已有的 cookie
2. 服务端设置 cookie
   1. 每个 set-cookie 设置一个 cookie
3. 客户端设置 cookie
   1. document.cookie
4. 读取和删除
   1. document.cookie  封装，无法直接删除，通过设置已经过期来间接实现删除
5. 良好习惯
   * 不超过 300 个 cookie
   * 每个 cookie 不超过 4096 字节
   * 每个域不超过 20 个 cookie（不同浏览器对每个域能设置的 cookie 总数是有限制的）
   * 每个域不超过 81920 字节
6. 一个用于操作 cookie 的类
   ``` typescript
      class CookieUtil {
         static get(name: string) {
            let cookieName = `${encodeURIComponent(name)}`,
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = null;
            
            if (cookieStart > -1) {
               let cookieEnd = document.cookie.indexOf(";", cookieStart);
               if (cookieEnd === -1) {
                  cookieEnd = document.cookie.length;
               }
               cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length + 1, cookieEnd));
               return cookieValue;
            } else {
               return null;
            }
         }

         static set(name, value, expires, path, domin, secure) {
            let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

            if (expires instanceof Date) {
               cookieText += `; expires=${expires.toGMTString()}`;
            }
            if (path) {
               cookieText += `; path=${path}`;
            }
            if (domain) {
               cookieText += `; domain=${domain}`;
            }
            if (secure) {
               cookieText += "; secure";
            }
            document.cookie = cookieText;
         }

         static unset(name, path, domain, secure) {
            CookieUtil.set(name, "", new Date(0), path, domain, secure);
         }
      }
   ```

## HTTP 首部
1. Set-Cookie, 响应头
2. Cookie，请求头，可以有多个 Cookie 头

## 缺点
1. 每个域名下的 cooke 数量有限
2. 储存量太小，只有 4kb
3. 每次 http 请求都会携带发送，影响效率
4. API 简陋，部分 cookie 可以通过 ` document.cookie ` 访问，
5. 客户端需要自己封装获取、设置、删除 cookie 的方法
6. 浏览器有自己的想法
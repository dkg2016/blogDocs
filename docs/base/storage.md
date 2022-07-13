# Storage
* 用于保存名/值对数据，直至存储空间上限(由浏览器决定)
* Storage 类型只能存储字符串 (` JSON.stringify() `)
* API
   1. ` setItem(name, JSON.stringfy(value)) `
   2. ` getItem(name) `
   3. ` clear() `
   4. ` removeItem(name) `
   5. ` key(index) `, 取得给定数值位置的名称
   6. ` length `，确定 Storage 对象中保存了多少名/值对


## LocalStorage
1. 最大 5M
2. API 简单易用
3. 永久存储
4. 同一个域(子域不可以)、相同的端口、相同的协议
   
## SessionStorage
1. 最大 5M
2. API 简单易用
3. 只存在当前会话，浏览器关闭则消失 (简单理解为，只在当前页有效)
4. 不受页面刷新影响
5. 新 tab，会建立新的 session
6. 可以用来重新填写input、刷新后的数据保存等；

## Storage 事件
1. 事件在同一个域下的不同页面之间触发，即在 A 页面注册了 storge 的监听处理，只有在跟 A 同域名下的 B 页面操作 storage 对象，A 页面才会被触发 storage 事件
2. 监听页面的 ` storage ` 事件， ` window.addEventListener("storage", event => console.log(event); `

## Storage 设置过期时间
Storage 除非删除，一直有效，有时候需要设置一个过期时间。就像 cookie 一样，每次使用 Storage 时，如果已经超过设置的有效时间，则不要使用缓存。核心就是，在设置缓存时，多设置一个过期字段。
* 一个微信小程序位置缓存的例子

```js {6-13,26-27}
// 获取缓存
getUserPosition() {
   wx.getStorage({
      key: 'POSITION',
      success: res => {
         const storagePosition = JSON.parse(res.data);
         // 缓存 过期
         if (Date.now() > storagePosition.expiredTime) {
            // 重新获取位置，更新缓存
            this.updateUserPosition();
         } else {
            // 缓存未过期，可以直接使用
         }
      },
      fail: _ => {
         // 重新获取位置，更新缓存
         this.updateUserPosition();
      }
   });
}

// 更新缓存
updateUserPosition() {
   wx.getLocation({
      success: position => {
         // 设置过期时间
         position.expiredTime = Date.now() + 24 * 3600 * 1000;
         wx.setStorage({
            key: 'POSITION',
            data: JSON.stringify(position)
         });
      },
      fail: err => {
         // location permisson denied
      }
   })
}
```

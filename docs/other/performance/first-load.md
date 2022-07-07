# 首屏渲染

## 一、减少请求

* ### 合理利用缓存

#### 场景1

首页需要获取和用户绑定的一本书籍 bindBookId，再根据 bindBookId 获取书的详情。用户的 bindBookId 是由用户手动设置更新的，并不随机

不需要每次进来都获取一次用户的 bindBookId。在用户第一次设置 bindBookId 时，就缓存下来。之后每次都取缓存中的值。**只需要在用户次设置 bindBookId 时，更新缓存中的 bindBookId**

相比发起一个请求，使用缓存的消耗的时间少很多


## 二、尽早加载

* ### 优化逻辑，合理使用异步

#### 场景1
以下是一个小程序首页渲染的几个关键时间点记录  
记录方式为，在 App onLaunch 中，标记一个开始时间点 ` timeStart `，然后在对应的时间点，记录 ` Date.now()` 和 ` timeStart ` 的差值
``` js
  // app.js
  onLaunch() {
    this.globalData.timeStart = Date.now();
  }

  // index.js
  const timeStart = app.globalData.timeStart;
  onLoad() {
    console.log('onLoad trigger', Date.now() - timeStart);
  }
  ...

```
#### 场景：
``` js
  async isLogin ? async getLocation -> async ajax login data -> render
                : async getLocation -> async ajax unLogin data -> render
```

**isLogin 和 getLocation 两个异步行为是线性关系，在 getLocation 完成后，才开始 Ajax 请求数据。但实际上并没有相互依赖关系。导致的后果就是，如果两个异步行为的时间分别为 300ms 和 100ms，那么 Ajax 至少要在 400ms 之后才开启**

**既然没有相互依赖关系，完全可以将 isLogin 和 getLocation 同时开始，Ajax 将在 isLogin 和 getLocation 中耗时比较长的的那个结束后，马上发起。既提前了 Ajax 开启的时间，又保证了 login 和 location 状态都已经获取到**

::: tip 
可以使用 Peomise.all() 或者 发布订阅 模式实现 
:::

#### 修改前
> 8 次记录值（Redmi K30， wifi，单位 ms )

|         | onLoad | isLogin | location | Ajax Start | Ajax End |
| ------- |:-------|:--------|:---------|:-----------|:---------|
| 1       | 232    | 275     | 415      | 439        | 578      |
| 2       | 242    | 298     | 363      | 379        | 501      |
| 3       | 179    | 221     | 334      | 349        | 475      |
| 4       | 177    | 234     | 318      | 333        | 521      |
| 5       | 213    | 323     | 365      | 380        | 504      |
| 6       | 237    | 280     | 370      | 387        | 528      |
| 7       | 212    | 257     | 323      | 338        | 456      |
| 8       | 205    | 314     | 376      | 425        | 523      |
| Average |        |         |          | **:angry:378.75**     | 510.75      | 

#### 修改后

|         | onLoad | isLogin | location | Ajax Start | Ajax End |
| ------- |:-------|:--------|:---------|:-----------|:---------|
| 1       | 194    | 250     | 250      | 253        | 367      |
| 2       | 196    | 252     | 251      | 255        | 382      |
| 3       | 219    | 278     | 278      | 281        | 417      |
| 4       | 183    | 234     | 234      | 236        | 361      |
| 5       | 212    | 283     | 282      | 285        | 403      |
| 6       | 242    | 301     | 301      | 304        | 401      |
| 7       | 215    | 279     | 279      | 283        | 413      |
| 8       | 168    | 238     | 238      | 245        | 338      |
| Average |        |         |          | **:star_struck:267.75**     | 385.25   |

Ajax 开始的时间，提前大约 100ms
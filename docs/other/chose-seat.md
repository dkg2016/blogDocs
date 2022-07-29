# 类似电影院的选座 H5

一个类似电影院、自习室选座的页面实现，可以平移、缩放，响应选座事件等    
使用 SVG 图形作为基底，因为 SVG  **缩放效果好、DOM操作方便、且支持事件绑定**  

## 效果图

<div style="display: flex; justify-content: space-around">
  <img width="300" src="/assets/seat-init.jpg">
  <img width="300" src="/assets/seat-select.jpg">
</div>

## 一、SVG 图的制作
SVG 制作中，把每个座位最为一个局部整体，使用 ` g ` 标签包裹起来，**并设置唯一的ID**，例如本例子中的 ` id="study2-seat24" `

以下一个大图中抽取的某个座位💺 和 SVG 代码

<div>
<svg>
<defs>
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
<linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="linearGradient-6">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#E0E9FF" offset="100%"></stop>
</linearGradient>
</defs>
<g id="study2-seat22" transform="translate(0,0)" occupied="false" seat-checked="false" select-seat="杭州西湖店-沉浸区-1 座位24">
  <rect id="rotate-270" fill-opacity="0" fill="#FFFFFF" x="0" y="0" width="96" height="100"></rect>
  <g id="seat" transform="translate(76.000000, 50.000000) rotate(270.000000) translate(-76.000000, -50.000000) translate(52.000000, 30.000000)">
    <path d="M34,0 C37.8707619,0 41.0994546,2.7490252 41.8402176,6.40121509 C39.6683761,7.23892676 38.1069582,9.30394323 38.0052768,11.7460572 L38,12 L38,24 L37.8997983,24.0009039 C37.4506669,26.2113879 35.5432173,27.8921171 33.2255371,27.995004 L33,28 L15,28 L14.7831104,27.9953805 C12.5389145,27.8995988 10.6777896,26.3245215 10.1500049,24.220418 L10.1002017,24.0009039 L10,24 L10,12 C10,9.44815538 8.40693686,7.26839059 6.16107425,6.4009693 C6.90054537,2.7490252 10.1292381,0 14,0 L34,0 Z" id="cushion" fill="url(#linearGradient-4)"></path>
    <path d="M34.162076,30 L34.3735255,30.0055557 C35.9162515,30.0867506 37.2761365,31.0515632 37.8624132,32.4808552 L37.9375094,32.6785983 L38.2865221,33.6755079 C39.015369,35.7573826 37.9213488,38.0363491 35.8410517,38.7696868 C33.514323,39.5898956 31.5673057,40 30,40 L18,40 C16.4327337,40 14.4857541,39.5899148 12.1590611,38.7697443 C10.0788389,38.0364655 8.98477985,35.7576598 9.71345064,33.675819 L10.0624906,32.6785983 L10.1375868,32.4808552 C10.7238635,31.0515632 12.0837485,30.0867506 13.6264745,30.0055557 L13.837924,30 L34.162076,30 Z M4,8 C6.209139,8 8,9.790861 8,12 L8,24 C8,25.9494805 8.92974171,27.6818081 10.3700035,28.7777614 C9.18600237,29.4479224 8.23882929,30.5151605 7.72861333,31.8352804 L7.63245553,32.1026334 L6.40913084,35.7719374 C2.99226527,32.8932327 0.661719128,28.7661681 0.120465416,24.0937166 C0.041461908,23.741942 0,23.375813 0,23 L0,12 C0,9.790861 1.790861,8 4,8 Z M44,8 C46.209139,8 48,9.790861 48,12 L48,23 C48,23.2818597 47.9766777,23.5582722 47.9318575,23.827413 L47.8799391,24.0940622 L47.8900962,24.0004182 C47.3692457,28.7110988 45.0305764,32.8738791 41.591127,35.7717202 L40.3675445,32.1026334 C39.8864079,30.6592237 38.892931,29.4925998 37.6297042,28.7776111 C39.0146187,27.7241466 39.9274033,26.0823759 39.9958615,24.2249383 L40,24 L40,12 C40,9.790861 41.790861,8 44,8 Z" id="armrest" fill="url(#linearGradient-5)"></path>
  </g>
  <rect id="desk" fill="url(#linearGradient-6)" transform="translate(26.000000, 50.000000) rotate(270.000000) translate(-26.000000, -50.000000) " x="-20" y="28" width="92" height="44" rx="8"></rect>
  <text id="24" transform="translate(26.000000, 50.000000) rotate(360.000000) translate(-26.000000, -50.000000) " font-family="DINAlternate-Bold, DIN Alternate" font-size="24" font-weight="bold" line-spacing="32" fill="#B2C1DD">
    <tspan x="14.4804688" y="57">24</tspan>
  </text>
</g>
</svg>
</div>

SVG 代码
``` html
<svg>
<defs>
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
<linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="linearGradient-6">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#E0E9FF" offset="100%"></stop>
</linearGradient>  
</defs>
<g id="study2-seat22" transform="translate(0,0)" occupied="false" seat-checked="false" select-seat="杭州西湖店-沉浸区-1 座位24">
  <rect id="rotate-270" fill-opacity="0" fill="#FFFFFF" x="0" y="0" width="96" height="100"></rect>
  <g id="seat" transform="translate(76.000000, 50.000000) rotate(270.000000) translate(-76.000000, -50.000000) translate(52.000000, 30.000000)">
    <path d="M34,0 C37.8707619,0 41.0994546,2.7490252 41.8402176,6.40121509 C39.6683761,7.23892676 38.1069582,9.30394323 38.0052768,11.7460572 L38,12 L38,24 L37.8997983,24.0009039 C37.4506669,26.2113879 35.5432173,27.8921171 33.2255371,27.995004 L33,28 L15,28 L14.7831104,27.9953805 C12.5389145,27.8995988 10.6777896,26.3245215 10.1500049,24.220418 L10.1002017,24.0009039 L10,24 L10,12 C10,9.44815538 8.40693686,7.26839059 6.16107425,6.4009693 C6.90054537,2.7490252 10.1292381,0 14,0 L34,0 Z" id="cushion" fill="url(#linearGradient-4)"></path>
    <path d="M34.162076,30 L34.3735255,30.0055557 C35.9162515,30.0867506 37.2761365,31.0515632 37.8624132,32.4808552 L37.9375094,32.6785983 L38.2865221,33.6755079 C39.015369,35.7573826 37.9213488,38.0363491 35.8410517,38.7696868 C33.514323,39.5898956 31.5673057,40 30,40 L18,40 C16.4327337,40 14.4857541,39.5899148 12.1590611,38.7697443 C10.0788389,38.0364655 8.98477985,35.7576598 9.71345064,33.675819 L10.0624906,32.6785983 L10.1375868,32.4808552 C10.7238635,31.0515632 12.0837485,30.0867506 13.6264745,30.0055557 L13.837924,30 L34.162076,30 Z M4,8 C6.209139,8 8,9.790861 8,12 L8,24 C8,25.9494805 8.92974171,27.6818081 10.3700035,28.7777614 C9.18600237,29.4479224 8.23882929,30.5151605 7.72861333,31.8352804 L7.63245553,32.1026334 L6.40913084,35.7719374 C2.99226527,32.8932327 0.661719128,28.7661681 0.120465416,24.0937166 C0.041461908,23.741942 0,23.375813 0,23 L0,12 C0,9.790861 1.790861,8 4,8 Z M44,8 C46.209139,8 48,9.790861 48,12 L48,23 C48,23.2818597 47.9766777,23.5582722 47.9318575,23.827413 L47.8799391,24.0940622 L47.8900962,24.0004182 C47.3692457,28.7110988 45.0305764,32.8738791 41.591127,35.7717202 L40.3675445,32.1026334 C39.8864079,30.6592237 38.892931,29.4925998 37.6297042,28.7776111 C39.0146187,27.7241466 39.9274033,26.0823759 39.9958615,24.2249383 L40,24 L40,12 C40,9.790861 41.790861,8 44,8 Z" id="armrest" fill="url(#linearGradient-5)"></path>
  </g>
  <rect id="desk" fill="url(#linearGradient-6)" transform="translate(26.000000, 50.000000) rotate(270.000000) translate(-26.000000, -50.000000) " x="-20" y="28" width="92" height="44" rx="8"></rect>
  <text id="24" transform="translate(26.000000, 50.000000) rotate(360.000000) translate(-26.000000, -50.000000) " font-family="DINAlternate-Bold, DIN Alternate" font-size="24" font-weight="bold" line-spacing="32" fill="#B2C1DD">
    <tspan x="14.4804688" y="57">24</tspan>
  </text>
</g>
</svg>
```

## 二、SVG 图的获取和预置样式添加
1. 在实际场景中，一般会在某个界面获取已经设计好的 SVG 图，通常是一个链接  
2. 可以使用` response-type `，获取到 SVG 图形的源码   
3. 通过 ` DOMParser `，读取 SVG 图形源码，并插入预定义的样式（将来选择座位时使用）
4. 插入样式，就是在 SVG 的 def 标签中，加入定义好的样式，例如某个渐变图形, 以下是加入预定义样式的 defs 标签。其中加入了 occupy-desk、occupy-seat、select-seat 等几个新的渐变样式（此处需要了解一些 svg defs、渐变、修改样式等知识）


``` html
<defs>
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
<linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="linearGradient-6">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#E0E9FF" offset="100%"></stop>
</linearGradient>  

<!-- 新加入的样式 -->
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="100%" x2="50%" y2="0%" id="occupy-desk">
  <stop stop-color="#E4E4E4" offset="0%"></stop>
  <stop stop-color="#D2D2D2" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="0%" x2="50%" y2="100%" id="occupy-seat">
  <stop stop-color="#E4E4E4" offset="0%"></stop>
  <stop stop-color="#D2D2D2" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="100%" x2="50%" y2="0%" id="select-desk">
  <stop stop-color="#3CA1FC" offset="0%"></stop>
  <stop stop-color="#3C7CFC" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="0%" x2="50%" y2="100%" id="select-seat">
  <stop stop-color="#5DB3FF" offset="0%"></stop>
  <stop stop-color="#3C6FFC" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="100%" x2="50%" y2="0%" id="default-desk">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#E0E9FF" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="0%" x2="50%" y2="100%" id="default-seat">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
</defs>
```

## 三、SVG 图缩放和手势事件添加
1. SVG 图的大小不固定，目标是每次都要把图形缩放到屏幕中央  
2. 方法是，获取 SVG 图形的宽高和外部盒子的宽高，计算后，进行平移和缩放
3. 使用 [hammer](http://hammerjs.github.io/)，监听 SVG 上的手势事件
4. 平移和缩放，使用的是 CSS 的 transform 属性，注意控制 scale 的比例

## 四、SVG 点击事件
1. 点击事件是加到每一个座位元素上,诸如 ` g#room1-seat1 `
2. 也曾想到在父元素上做事件监听，但是不利于后期确定座位，所以还是在每一个座位上添加事件监听
3. 通过 ` querySelectorAll `,获取到所有座位，然后在座位上添加事件监听
4. 在座位点击时，设置 SVG 元素的样式
5. 此处有个坑，注意 g 元素下的事件监听，有些区域点击监听不到，可以尝试添加一个 rect 进去
6. 可以多使用缓存，存储 DOM 查询，存储当前选择的 DOM 等，提高性能

``` js
const seatDOM = document.getElementById('study2-seat24');
seatDOM.addEventListener('click', () => {
  const seatChecked = seatDOM.getAttribute('seat-checked');
  if (seatChecked === 'true') {
    // setSeatUI 是修改 svg 样式的函数
    seatDOM.setAttribute('seat-checked', false);
    setSeatUI(seatDOM, 'default');
  } else {
    seatDOM.setAttribute('seat-checked', true);
    setSeatUI(seatDOM, 'select');
  }
});
```

⬇️ 可以点击查看效果
<div>
<svg>
<defs>
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
<linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="linearGradient-6">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#E0E9FF" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="100%" x2="50%" y2="0%" id="occupy-desk">
  <stop stop-color="#E4E4E4" offset="0%"></stop>
  <stop stop-color="#D2D2D2" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="0%" x2="50%" y2="100%" id="occupy-seat">
  <stop stop-color="#E4E4E4" offset="0%"></stop>
  <stop stop-color="#D2D2D2" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="100%" x2="50%" y2="0%" id="select-desk">
  <stop stop-color="#3CA1FC" offset="0%"></stop>
  <stop stop-color="#3C7CFC" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="0%" x2="50%" y2="100%" id="select-seat">
  <stop stop-color="#5DB3FF" offset="0%"></stop>
  <stop stop-color="#3C6FFC" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="100%" x2="50%" y2="0%" id="default-desk">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#E0E9FF" offset="100%"></stop>
</linearGradient>
<linearGradient xmlns="http://www.w3.org/2000/svg" x1="50%" y1="0%" x2="50%" y2="100%" id="default-seat">
  <stop stop-color="#E5EDFF" offset="0%"></stop>
  <stop stop-color="#D5E1FC" offset="100%"></stop>
</linearGradient>
</defs>
<g id="study2-seat24" transform="translate(0,0)" occupied="false" seat-checked="false" select-seat="杭州西湖店-沉浸区-1 座位24">
  <rect id="rotate-270" fill-opacity="0" fill="#FFFFFF" x="0" y="0" width="96" height="100"></rect>
  <g id="seat" transform="translate(76.000000, 50.000000) rotate(270.000000) translate(-76.000000, -50.000000) translate(52.000000, 30.000000)">
    <path d="M34,0 C37.8707619,0 41.0994546,2.7490252 41.8402176,6.40121509 C39.6683761,7.23892676 38.1069582,9.30394323 38.0052768,11.7460572 L38,12 L38,24 L37.8997983,24.0009039 C37.4506669,26.2113879 35.5432173,27.8921171 33.2255371,27.995004 L33,28 L15,28 L14.7831104,27.9953805 C12.5389145,27.8995988 10.6777896,26.3245215 10.1500049,24.220418 L10.1002017,24.0009039 L10,24 L10,12 C10,9.44815538 8.40693686,7.26839059 6.16107425,6.4009693 C6.90054537,2.7490252 10.1292381,0 14,0 L34,0 Z" id="cushion" fill="url(#linearGradient-4)"></path>
    <path d="M34.162076,30 L34.3735255,30.0055557 C35.9162515,30.0867506 37.2761365,31.0515632 37.8624132,32.4808552 L37.9375094,32.6785983 L38.2865221,33.6755079 C39.015369,35.7573826 37.9213488,38.0363491 35.8410517,38.7696868 C33.514323,39.5898956 31.5673057,40 30,40 L18,40 C16.4327337,40 14.4857541,39.5899148 12.1590611,38.7697443 C10.0788389,38.0364655 8.98477985,35.7576598 9.71345064,33.675819 L10.0624906,32.6785983 L10.1375868,32.4808552 C10.7238635,31.0515632 12.0837485,30.0867506 13.6264745,30.0055557 L13.837924,30 L34.162076,30 Z M4,8 C6.209139,8 8,9.790861 8,12 L8,24 C8,25.9494805 8.92974171,27.6818081 10.3700035,28.7777614 C9.18600237,29.4479224 8.23882929,30.5151605 7.72861333,31.8352804 L7.63245553,32.1026334 L6.40913084,35.7719374 C2.99226527,32.8932327 0.661719128,28.7661681 0.120465416,24.0937166 C0.041461908,23.741942 0,23.375813 0,23 L0,12 C0,9.790861 1.790861,8 4,8 Z M44,8 C46.209139,8 48,9.790861 48,12 L48,23 C48,23.2818597 47.9766777,23.5582722 47.9318575,23.827413 L47.8799391,24.0940622 L47.8900962,24.0004182 C47.3692457,28.7110988 45.0305764,32.8738791 41.591127,35.7717202 L40.3675445,32.1026334 C39.8864079,30.6592237 38.892931,29.4925998 37.6297042,28.7776111 C39.0146187,27.7241466 39.9274033,26.0823759 39.9958615,24.2249383 L40,24 L40,12 C40,9.790861 41.790861,8 44,8 Z" id="armrest" fill="url(#linearGradient-5)"></path>
  </g>
  <rect id="desk" fill="url(#linearGradient-6)" transform="translate(26.000000, 50.000000) rotate(270.000000) translate(-26.000000, -50.000000) " x="-20" y="28" width="92" height="44" rx="8"></rect>
  <text id="24" transform="translate(26.000000, 50.000000) rotate(360.000000) translate(-26.000000, -50.000000) " font-family="DINAlternate-Bold, DIN Alternate" font-size="24" font-weight="bold" line-spacing="32" fill="#B2C1DD">
    <tspan x="14.4804688" y="57">24</tspan>
  </text>
</g>
</svg>
</div>

<script>
  export default {
    mounted() {
      const seatDOM = window.document.getElementById('study2-seat24');
      seatDOM.addEventListener('click', () => {
        const seatChecked = seatDOM.getAttribute('seat-checked');

        if (seatChecked === 'true') {
          seatDOM.setAttribute('seat-checked', false);
          setSeatUI(seatDOM, 'default');
        } else {
          seatDOM.setAttribute('seat-checked', true);
          setSeatUI(seatDOM, 'select');
        }
      });
    }
  }

  function setSeatUI(wrapDOM, type) {
    let deskFillUrl = '';
    let seatFillUrl = '';
    let textFillColor = '';
    if (type === 'select') {
      deskFillUrl = 'url(#select-desk)';
      seatFillUrl = 'url(#select-seat)';
      textFillColor = '#FFF';
    } else if (type === 'default') {
      deskFillUrl = 'url(#default-desk)';
      seatFillUrl = 'url(#default-seat)';
      textFillColor = '#B2C1DD';
    } else {
      deskFillUrl = 'url(#default-desk)';
      seatFillUrl = 'url(#default-seat)';
      textFillColor = '#B2C1DD';
    }

    wrapDOM.querySelectorAll('rect#desk').forEach((deskDom) => {
      deskDom.setAttribute('fill', deskFillUrl);
    });
    wrapDOM.querySelectorAll('path#cushion').forEach((cushionDom) => {
      cushionDom.setAttribute('fill', seatFillUrl)
    });
    wrapDOM.querySelectorAll('path#armrest').forEach((armDom) => {
      armDom.setAttribute('fill', seatFillUrl)
    });
    wrapDOM.querySelectorAll('text').forEach((textDom) => {
      textDom.setAttribute('fill', textFillColor)
    });
  }
</script>

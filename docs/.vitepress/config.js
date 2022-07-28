export default {
  title: 'RANDOM',
  description: 'Just playing around!',
  themeConfig: {
    siteTitle: 'Random Doc',
    nav: [
      { text: '日常记录', link: '/base/cookie'},
      { 
        text: '其它', 
        items: [
          { text: '首屏加载', link: '/other/first-load.md'},
          { text: '选座 H5', link: '/other/chose-seat.md' }
        ]
      },
      // { 
      //   text: 'Drop Down',
      //   items: [
      //     { text: 'Guide', link: '/guide/index.md'},
      //     { text: 'Guide', link: '/guide/index.md'},
      //     { text: 'Section A Title',
      //       items: [
      //         { text: 'Section A Item A', link: '...' },
      //         { text: 'Section B Item B', link: '...' }
      //       ]
      //     },
      //   ] 
      // },
    ],
    sidebar: {
      '/base/': [
        {
          text: '',
          items: [
            { text: 'Cookie 相关', link: '/base/cookie' }
          ]
        }
      ],
      '/other/': [
        {
          items: [
            { text: '首屏加载', link: '/other/first-load' },
            { text: '选座 H5', link: '/other/chose-seat.md' }
          ]
        }
      ]
    },
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  }
}
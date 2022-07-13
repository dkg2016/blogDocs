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
          { text: '首屏加载', link: '/other/performance/first-load.md'},
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
      '/other/performance/': [
        {
          items: [
            { text: '首屏加载', link: '/other/performance/first-load' }
          ]
        }
      ]
    },
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    //   { icon: 'twitter', link: '...' },
    //   { icon: 'discord', link: '...' },
    //   { icon: 'youtube', link: '...' },
    // ],
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // }
  },
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  }
}
export default {
  title: '记录',
  description: 'Just playing around!',
  themeConfig: {
    siteTitle: 'Random Doc',
    nav: [
      { text: '基础', link: '/base/'},
      { 
        text: '其它', 
        items: [
          { text: '性能优化', link: '/other/performance/first-load.md'},
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
          text: '基础知识',
          items: [
            { text: 'Cookie', link: '/base/cookie' },
            { text: 'Storage', link: '/base/storage' },
          ]
        }
      ],
      '/other/performance/': [
        { 
          text: '性能优化',
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
  }
}
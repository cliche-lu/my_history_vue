# my_history_vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目介绍
本项目是一个基于Vue.js的网页应用，用于记录和管理用户的历史记录。用户可以通过添加、删除、编辑和搜索历史记录来管理他们的浏览历史。项目使用了Vue.js框架，并使用了Element UI组件库来构建用户界面。

存在的问题：
1. 在登录token过期后未及时清空token，需要登录一次后清理token
2. 文件上传失败的钩子未被调用，需要增加上传失败的钩子

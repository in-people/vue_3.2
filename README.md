# Vue 3.2 后台管理系统

## 项目简介

这是一个基于 Vue 3 + Element Plus 的后台管理系统，实现了完整的权限管理、用户管理、商品管理、订单管理等功能。项目采用最新的前端技术栈，具有良好的代码结构和可维护性。

## 功能特性

### 核心功能
- ✅ **用户管理**: 用户列表、添加用户、编辑用户、删除用户、状态管理
- ✅ **权限管理**: 角色管理、权限管理
- ✅ **商品管理**: 商品列表、商品分类、分类参数
- ✅ **订单管理**: 订单列表、订单处理
- ✅ **数据统计**: 数据报表、可视化图表

### 技术特性
- 🎨 **国际化**: 支持中文/英文切换
- 🌓 **主题定制**: 深色侧边栏主题
- 📱 **响应式布局**: 支持侧边栏折叠展开
- 🔐 **权限控制**: 基于路由守卫的身份验证
- 📊 **数据可视化**: 集成 ECharts 图表
- 🎯 **Mock 数据**: 开发环境使用 Mock 数据

## 技术栈

### 核心框架
- **Vue 3.2**: 采用 Composition API
- **Vue Router 4**: 路由管理
- **Vuex 4**: 状态管理
- **Element Plus**: UI 组件库
- **Axios**: HTTP 请求库
- **Mock.js**: 模拟数据

### 开发工具
- **Vite**: 构建工具
- **ESLint**: 代码规范检查
- **Prettier**: 代码格式化
- **Husky**: Git 钩子
- **Commitizen**: 规范化提交

## 项目结构

```
src/
├── api/              # API 接口
├── assets/           # 静态资源
├── components/       # 公共组件
├── i18n/             # 国际化配置
├── layout/           # 布局组件
│   ├── Menu/         # 侧边栏菜单
│   └── headers/      # 顶部导航
├── router/           # 路由配置
├── store/            # Vuex 状态管理
├── styles/           # 全局样式
├── utils/            # 工具函数
├── views/            # 页面组件
├── App.vue           # 根组件
└── main.js           # 入口文件
```

## 项目特性说明

### 1. 布局架构
- **固定侧边栏**: 左侧菜单固定，内容区域滚动
- **响应式宽度**: 支持侧边栏展开/收起（200px ↔ 64px）
- **平滑动画**: CSS transition 实现流畅过渡

### 2. 路由守卫
- **身份验证**: 基于 Token 的登录验证
- **自动重定向**: 未登录自动跳转登录页
- **白名单机制**: 登录页等特殊页面放行

### 3. HTTP 拦截器
- **请求拦截**: 自动添加 Token 到请求头
- **响应拦截**: 统一处理响应数据和错误
- **Token 过期**: 自动检测并退出登录

### 4. 国际化支持
- **Vue I18n**: 完整的多语言支持
- **动态切换**: 实时切换中英文
- **菜单翻译**: 所有菜单项支持国际化

### 5. 表格优化
- **配置化渲染**: 通过配置文件渲染表格列
- **循环渲染**: 使用 v-for 减少重复代码
- **易于维护**: 新增列只需修改配置

## 安装和运行

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0

### 项目安装
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

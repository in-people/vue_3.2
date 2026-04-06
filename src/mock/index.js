import Mock from 'mockjs'

// 设置延迟响应，模拟网络延迟
Mock.setup({
  timeout: '200-600'
})

// 通用响应格式
const successResponse = (data) => ({
  data,
  meta: {
    status: 200,
    msg: '操作成功'
  }
})

const errorResponse = (msg = '操作失败') => ({
  data: null,
  meta: {
    status: 400,
    msg
  }
})

// 模拟登录接口
Mock.mock(/\/api\/login/, 'post', (options) => {
  const { username } = JSON.parse(options.body)

  // 模拟用户验证 - 用户名 admin，任意密码都可以登录
  if (username === 'admin') {
    return successResponse({
      token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + Date.now(),
      username: 'admin',
      role: 'admin'
    })
  } else {
    return errorResponse('用户名或密码错误')
  }
})

// 模拟菜单接口
Mock.mock(/\/api\/menus/, 'get', () => {
  return successResponse([
    {
      id: '1',
      authName: '用户管理',
      path: 'users',
      order: 1,
      children: [
        {
          id: '11',
          authName: '用户列表',
          path: 'users',
          order: 1
        }
      ]
    },
    {
      id: '2',
      authName: '权限管理',
      path: 'rights',
      order: 2,
      children: [
        {
          id: '21',
          authName: '角色列表',
          path: 'roles',
          order: 1
        },
        {
          id: '22',
          authName: '权限列表',
          path: 'rights',
          order: 2
        }
      ]
    },
    {
      id: '3',
      authName: '商品管理',
      path: 'goods',
      order: 3,
      children: [
        {
          id: '31',
          authName: '商品列表',
          path: 'goods',
          order: 1
        },
        {
          id: '32',
          authName: '分类参数',
          path: 'params',
          order: 2
        },
        {
          id: '33',
          authName: '商品分类',
          path: 'categories',
          order: 3
        }
      ]
    },
    {
      id: '4',
      authName: '订单管理',
      path: 'orders',
      order: 4,
      children: [
        {
          id: '41',
          authName: '订单列表',
          path: 'orders',
          order: 1
        }
      ]
    },
    {
      id: '5',
      authName: '数据统计',
      path: 'reports',
      order: 5,
      children: [
        {
          id: '51',
          authName: '数据报表',
          path: 'reports',
          order: 1
        }
      ]
    }
  ])
})

// 缓存用户数据，确保每次请求返回相同的数据
const cachedUsersList = (() => {
  const users = [
    { id: '1001', username: '张三', email: 'zhangsan@example.com', mobile: '13800138001', role_name: '超级管理员', mg_state: true },
    { id: '1002', username: '李四', email: 'lisi@example.com', mobile: '13800138002', role_name: '管理员', mg_state: true },
    { id: '1003', username: '王五', email: 'wangwu@example.com', mobile: '13800138003', role_name: '普通用户', mg_state: false },
    { id: '1004', username: '赵六', email: 'zhaoliu@example.com', mobile: '13800138004', role_name: '普通用户', mg_state: true },
    { id: '1005', username: '钱七', email: 'qianqi@example.com', mobile: '13800138005', role_name: '管理员', mg_state: true },
    { id: '1006', username: '孙八', email: 'sunba@example.com', mobile: '13800138006', role_name: '普通用户', mg_state: true },
    { id: '1007', username: '周九', email: 'zhoujiu@example.com', mobile: '13800138007', role_name: '超级管理员', mg_state: false },
    { id: '1008', username: '吴十', email: 'wushi@example.com', mobile: '13800138008', role_name: '普通用户', mg_state: true },
    { id: '1009', username: '郑十一', email: 'zhengshiyi@example.com', mobile: '13800138009', role_name: '管理员', mg_state: true },
    { id: '1010', username: '王十二', email: 'wangshier@example.com', mobile: '13800138010', role_name: '普通用户', mg_state: true },
    { id: '1011', username: '冯小明', email: 'fengxiaoming@example.com', mobile: '13800138011', role_name: '管理员', mg_state: false },
    { id: '1012', username: '陈小红', email: 'chenxiaohong@example.com', mobile: '13800138012', role_name: '普通用户', mg_state: true },
    { id: '1013', username: '褚小刚', email: 'chuxiaogang@example.com', mobile: '13800138013', role_name: '超级管理员', mg_state: true },
    { id: '1014', username: '卫小丽', email: 'weixiaoli@example.com', mobile: '13800138014', role_name: '普通用户', mg_state: true },
    { id: '1015', username: '蒋小华', email: 'jiangxiaohua@example.com', mobile: '13800138015', role_name: '管理员', mg_state: false },
    { id: '1016', username: '沈小龙', email: 'shenxiaolong@example.com', mobile: '13800138016', role_name: '普通用户', mg_state: true },
    { id: '1017', username: '韩小燕', email: 'hanxiaoyan@example.com', mobile: '13800138017', role_name: '管理员', mg_state: true },
    { id: '1018', username: '杨小军', email: 'yangxiaojun@example.com', mobile: '13800138018', role_name: '普通用户', mg_state: true },
    { id: '1019', username: '朱小梅', email: 'zhuxiaomei@example.com', mobile: '13800138019', role_name: '超级管理员', mg_state: false },
    { id: '1020', username: '秦小强', email: 'qinxiaoqiang@example.com', mobile: '13800138020', role_name: '普通用户', mg_state: true },
    { id: '1021', username: '尤小芳', email: 'youxiaofang@example.com', mobile: '13800138021', role_name: '管理员', mg_state: true },
    { id: '1022', username: '许小杰', email: 'xuxiaojie@example.com', mobile: '13800138022', role_name: '普通用户', mg_state: true },
    { id: '1023', username: '何小娜', email: 'hexiaona@example.com', mobile: '13800138023', role_name: '管理员', mg_state: false },
    { id: '1024', username: '吕小涛', email: 'luxiaotao@example.com', mobile: '13800138024', role_name: '普通用户', mg_state: true },
    { id: '1025', username: '施小磊', email: 'shixiaolei@example.com', mobile: '13800138025', role_name: '超级管理员', mg_state: true },
    { id: '1026', username: '张小伟', email: 'zhangxiaowei@example.com', mobile: '13800138026', role_name: '普通用户', mg_state: true },
    { id: '1027', username: '孔小静', email: 'kongxiaojing@example.com', mobile: '13800138027', role_name: '管理员', mg_state: false },
    { id: '1028', username: '曹小敏', email: 'caoxiaomin@example.com', mobile: '13800138028', role_name: '普通用户', mg_state: true },
    { id: '1029', username: '严小波', email: 'yanxiaobo@example.com', mobile: '13800138029', role_name: '管理员', mg_state: true },
    { id: '1030', username: '华小婷', email: 'huaxiaoting@example.com', mobile: '13800138030', role_name: '普通用户', mg_state: true }
  ]
  return users
})()

// 模拟用户列表接口
Mock.mock(/\/api\/users(\?.*)?$/, 'get', (options) => {
  // 解析查询参数
  const url = new URL(options.url, 'http://localhost')
  const query = url.searchParams.get('query') || ''
  const pagenum = parseInt(url.searchParams.get('pagenum')) || 1
  const pagesize = parseInt(url.searchParams.get('pagesize')) || 10

  // 根据查询条件过滤用户
  let filteredUsers = cachedUsersList
  if (query) {
    filteredUsers = cachedUsersList.filter(user =>
      user.username.includes(query) ||
      user.mobile.includes(query) ||
      user.email.includes(query)
    )
  }

  // 计算分页数据
  const total = filteredUsers.length
  const startIndex = (pagenum - 1) * pagesize
  const endIndex = startIndex + pagesize
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  return successResponse({
    total,
    pagenum,
    users: paginatedUsers
  })
})

// 模拟用户详情查询
Mock.mock(/\/api\/users\/\d+$/, 'get', (options) => {
  const id = options.url.match(/\/api\/users\/(\d+)$/)[1]
  // 从缓存列表中查找对应的用户数据
  const user = cachedUsersList.find(u => u.id === id)

  if (user) {
    return successResponse(user)
  } else {
    return errorResponse('用户不存在')
  }
})

// 模拟添加用户
Mock.mock(/\/api\/users$/, 'post', (options) => {
  const body = JSON.parse(options.body)

  // 生成新的用户ID（当前最大ID + 1）
  const maxId = Math.max(...cachedUsersList.map(u => parseInt(u.id)))
  const newId = String(maxId + 1)

  // 创建新用户对象
  const newUser = {
    id: newId,
    username: body.username,
    email: body.email,
    mobile: body.mobile,
    role_name: body.role_name,
    mg_state: true // 默认启用
  }

  // 添加到缓存列表的开头
  cachedUsersList.unshift(newUser)

  return successResponse({
    ...newUser,
    message: '用户添加成功'
  })
})

// 模拟用户编辑
Mock.mock(/\/api\/users\/\d+$/, 'put', (options) => {
  const id = options.url.match(/\/api\/users\/(\d+)$/)[1]
  const body = JSON.parse(options.body)

  // 从缓存列表中查找对应的用户索引
  const userIndex = cachedUsersList.findIndex(u => u.id === id)

  if (userIndex !== -1) {
    // 更新缓存中的用户数据
    cachedUsersList[userIndex] = {
      ...cachedUsersList[userIndex],
      email: body.email,
      mobile: body.mobile,
      role_name: body.role_name
    }

    return successResponse({
      ...cachedUsersList[userIndex],
      message: '用户更新成功'
    })
  } else {
    return errorResponse('用户不存在')
  }
})

// 模拟用户状态修改
Mock.mock(/\/api\/users\/\d+\/state\/(true|false)/, 'put', (options) => {
  const matches = options.url.match(/\/api\/users\/(\d+)\/state\/(true|false)/)
  const id = matches[1]
  const state = matches[2] === 'true'

  // 从缓存列表中查找对应的用户索引
  const userIndex = cachedUsersList.findIndex(u => u.id === id)

  if (userIndex !== -1) {
    // 更新缓存中的用户状态
    cachedUsersList[userIndex].mg_state = state

    return successResponse({
      message: '状态修改成功'
    })
  } else {
    return errorResponse('用户不存在')
  }
})

// 模拟用户添加
Mock.mock(/\/api\/users/, 'post', () => {
  return successResponse({
    id: String(Mock.Random.integer(1000, 9999)),
    username: '@cname',
    mobile: /^1[3-9]\d{9}$/,
    email: '@email',
    role_name: '普通用户',
    mg_state: true
  })
})

// 模拟用户编辑
Mock.mock(/\/api\/users\/\d+/, 'put', () => {
  return successResponse({ msg: '用户更新成功' })
})

// 模拟用户删除
Mock.mock(/\/api\/users\/\d+$/, 'delete', (options) => {
  const id = options.url.match(/\/api\/users\/(\d+)$/)[1]

  // 从缓存列表中查找对应的用户索引
  const userIndex = cachedUsersList.findIndex(u => u.id === id)

  if (userIndex !== -1) {
    // 从缓存中删除用户
    cachedUsersList.splice(userIndex, 1)

    return successResponse({
      message: '用户删除成功'
    })
  } else {
    return errorResponse('用户不存在')
  }
})

// 模拟权限列表
Mock.mock(/\/api\/rights/, 'get', () => {
  const rights = []
  for (let i = 1; i <= 20; i++) {
    rights.push(
      Mock.mock({
        id: String(i + 100),
        authName: '@ctitle(3,8)',
        level: i <= 10 ? '0' : '1',
        path: '@lower(@ctitle(2,4))',
        pid: i <= 10 ? '0' : String(Mock.Random.integer(1, 10))
      })
    )
  }

  return successResponse(rights)
})

// 模拟角色列表
Mock.mock(/\/api\/roles/, 'get', () => {
  const roles = [
    {
      id: '1',
      roleName: '超级管理员',
      roleDesc: '拥有所有权限',
      children: [
        { id: '101', authName: '用户管理', path: 'users' },
        { id: '102', authName: '权限管理', path: 'rights' },
        { id: '103', authName: '商品管理', path: 'goods' },
        { id: '104', authName: '订单管理', path: 'orders' },
        { id: '105', authName: '数据统计', path: 'reports' }
      ]
    },
    {
      id: '2',
      roleName: '管理员',
      roleDesc: '拥有部分权限',
      children: [
        { id: '101', authName: '用户管理', path: 'users' },
        { id: '103', authName: '商品管理', path: 'goods' }
      ]
    },
    {
      id: '3',
      roleName: '普通用户',
      roleDesc: '只有查看权限',
      children: []
    }
  ]

  return successResponse(roles)
})

// 缓存商品数据，确保每次请求返回相同的数据
const cachedGoodsList = (() => {
  const goods = [
    { goods_id: '1001', goods_name: 'iPhone 15 Pro Max', goods_price: 9999, goods_number: 100, goods_weight: 221, goods_state: 0, add_time: 1512954923, upd_time: 1512954923, hot_mumber: 580, is_promote: true, goods_cat: '1,5,12', goods_introduce: '苹果最新旗舰手机', pics: [], attrs: [] },
    { goods_id: '1002', goods_name: '华为 Mate 60 Pro', goods_price: 6999, goods_number: 200, goods_weight: 225, goods_state: 1, add_time: 1512960000, upd_time: 1512960000, hot_mumber: 890, is_promote: true, goods_cat: '1,5,13', goods_introduce: '华为年度旗舰', pics: [], attrs: [] },
    { goods_id: '1003', goods_name: '小米14 Ultra', goods_price: 6499, goods_number: 150, goods_weight: 230, goods_state: 2, add_time: 1512965000, upd_time: 1512965000, hot_mumber: 670, is_promote: false, goods_cat: '1,5,14', goods_introduce: '小米影像旗舰', pics: [], attrs: [] },
    { goods_id: '1004', goods_name: 'OPPO Find X7', goods_price: 5999, goods_number: 120, goods_weight: 210, goods_state: 1, add_time: 1512970000, upd_time: 1512970000, hot_mumber: 450, is_promote: false, goods_cat: '1,5,15', goods_introduce: 'OPPO旗舰手机', pics: [], attrs: [] },
    { goods_id: '1005', goods_name: 'vivo X100 Pro', goods_price: 5499, goods_number: 180, goods_weight: 215, goods_state: 0, add_time: 1512975000, upd_time: 1512975000, hot_mumber: 520, is_promote: true, goods_cat: '1,5,16', goods_introduce: 'vivo影像旗舰', pics: [], attrs: [] },
    { goods_id: '1006', goods_name: '三星 Galaxy S24 Ultra', goods_price: 9699, goods_number: 90, goods_weight: 232, goods_state: 2, add_time: 1512980000, upd_time: 1512980000, hot_mumber: 380, is_promote: false, goods_cat: '1,5,17', goods_introduce: '三星年度旗舰', pics: [], attrs: [] },
    { goods_id: '1007', goods_name: '联想拯救者 Y9000P', goods_price: 12999, goods_number: 50, goods_weight: 2600, goods_state: 1, add_time: 1512985000, upd_time: 1512985000, hot_mumber: 290, is_promote: true, goods_cat: '1,3,8', goods_introduce: '电竞游戏本', pics: [], attrs: [] },
    { goods_id: '1008', goods_name: '戴尔 XPS 15', goods_price: 15999, goods_number: 40, goods_weight: 1800, goods_state: 2, add_time: 1512990000, upd_time: 1512990000, hot_mumber: 180, is_promote: false, goods_cat: '1,3,9', goods_introduce: '轻薄全能本', pics: [], attrs: [] },
    { goods_id: '1009', goods_name: '索尼 WH-1000XM5', goods_price: 2499, goods_number: 300, goods_weight: 250, goods_state: 1, add_time: 1512995000, upd_time: 1512995000, hot_mumber: 780, is_promote: true, goods_cat: '1,7,20', goods_introduce: '降噪耳机旗舰', pics: [], attrs: [] },
    { goods_id: '1010', goods_name: 'iPad Pro 12.9', goods_price: 8999, goods_number: 80, goods_weight: 682, goods_state: 0, add_time: 1513000000, upd_time: 1513000000, hot_mumber: 460, is_promote: false, goods_cat: '1,4,18', goods_introduce: '苹果平板旗舰', pics: [], attrs: [] },
    { goods_id: '1011', goods_name: 'AirPods Pro 2', goods_price: 1899, goods_number: 500, goods_weight: 56, goods_state: 2, add_time: 1513005000, upd_time: 1513005000, hot_mumber: 1200, is_promote: true, goods_cat: '1,7,21', goods_introduce: '苹果降噪耳机', pics: [], attrs: [] },
    { goods_id: '1012', goods_name: 'MacBook Pro 14', goods_price: 16999, goods_number: 30, goods_weight: 1600, goods_state: 1, add_time: 1513010000, upd_time: 1513010000, hot_mumber: 340, is_promote: false, goods_cat: '1,3,10', goods_introduce: '苹果专业笔记本', pics: [], attrs: [] },
    { goods_id: '1013', goods_name: '华为 MateBook X Pro', goods_price: 10999, goods_number: 60, goods_weight: 1200, goods_state: 0, add_time: 1513015000, upd_time: 1513015000, hot_mumber: 210, is_promote: true, goods_cat: '1,3,11', goods_introduce: '华为轻薄旗舰', pics: [], attrs: [] },
    { goods_id: '1014', goods_name: '小米平板 6 Max', goods_price: 3299, goods_number: 200, goods_weight: 490, goods_state: 2, add_time: 1513020000, upd_time: 1513020000, hot_mumber: 590, is_promote: false, goods_cat: '1,4,19', goods_introduce: '小米大屏平板', pics: [], attrs: [] },
    { goods_id: '1015', goods_name: '罗技 MX Master 3S', goods_price: 699, goods_number: 400, goods_weight: 141, goods_state: 1, add_time: 1513025000, upd_time: 1513025000, hot_mumber: 680, is_promote: false, goods_cat: '1,6,22', goods_introduce: '无线办公鼠标', pics: [], attrs: [] },
    { goods_id: '1016', goods_name: 'Keychron K8 Pro', goods_price: 598, goods_number: 350, goods_weight: 950, goods_state: 0, add_time: 1513030000, upd_time: 1513030000, hot_mumber: 420, is_promote: true, goods_cat: '1,6,23', goods_introduce: '机械键盘', pics: [], attrs: [] },
    { goods_id: '1017', goods_name: '佳能 EOS R6 Mark II', goods_price: 16499, goods_number: 20, goods_weight: 670, goods_state: 2, add_time: 1513035000, upd_time: 1513035000, hot_mumber: 150, is_promote: false, goods_cat: '1,8,24', goods_introduce: '专业微单相机', pics: [], attrs: [] },
    { goods_id: '1018', goods_name: '任天堂 Switch OLED', goods_price: 2599, goods_number: 150, goods_weight: 420, goods_state: 1, add_time: 1513040000, upd_time: 1513040000, hot_mumber: 890, is_promote: true, goods_cat: '1,9,25', goods_introduce: '游戏主机', pics: [], attrs: [] },
    { goods_id: '1019', goods_name: 'Apple Watch Series 9', goods_price: 3199, goods_number: 250, goods_weight: 42, goods_state: 0, add_time: 1513045000, upd_time: 1513045000, hot_mumber: 560, is_promote: false, goods_cat: '1,10,26', goods_introduce: '智能手表', pics: [], attrs: [] },
    { goods_id: '1020', goods_name: 'Bose QC45', goods_price: 1999, goods_number: 280, goods_weight: 240, goods_state: 2, add_time: 1513050000, upd_time: 1513050000, hot_mumber: 470, is_promote: true, goods_cat: '1,7,27', goods_introduce: '降噪耳机', pics: [], attrs: [] },
    { goods_id: '1021', goods_name: '大疆 Mini 4 Pro', goods_price: 4788, goods_number: 70, goods_weight: 249, goods_state: 1, add_time: 1513055000, upd_time: 1513055000, hot_mumber: 320, is_promote: false, goods_cat: '1,11,28', goods_introduce: '迷你无人机', pics: [], attrs: [] },
    { goods_id: '1022', goods_name: 'Kindle Oasis', goods_price: 2399, goods_number: 180, goods_weight: 188, goods_state: 0, add_time: 1513060000, upd_time: 1513060000, hot_mumber: 280, is_promote: false, goods_cat: '1,12,29', goods_introduce: '电子书阅读器', pics: [], attrs: [] },
    { goods_id: '1023', goods_name: '索尼 A7M5', goods_price: 18999, goods_number: 25, goods_weight: 730, goods_state: 2, add_time: 1513065000, upd_time: 1513065000, hot_mumber: 190, is_promote: true, goods_cat: '1,8,30', goods_introduce: '全画幅微单', pics: [], attrs: [] },
    { goods_id: '1024', goods_name: '华为 FreeBuds Pro 3', goods_price: 1499, goods_number: 450, goods_weight: 62, goods_state: 1, add_time: 1513070000, upd_time: 1513070000, hot_mumber: 920, is_promote: true, goods_cat: '1,7,31', goods_introduce: '华为降噪耳机', pics: [], attrs: [] },
    { goods_id: '1025', goods_name: 'Surface Laptop 5', goods_price: 10888, goods_number: 45, goods_weight: 1270, goods_state: 0, add_time: 1513075000, upd_time: 1513075000, hot_mumber: 230, is_promote: false, goods_cat: '1,3,32', goods_introduce: '微软笔记本', pics: [], attrs: [] },
    { goods_id: '1026', goods_name: 'LG C3 OLED 65寸', goods_price: 12999, goods_number: 35, goods_weight: 32000, goods_state: 2, add_time: 1513080000, upd_time: 1513080000, hot_mumber: 160, is_promote: false, goods_cat: '1,13,33', goods_introduce: 'OLED电视', pics: [], attrs: [] },
    { goods_id: '1027', goods_name: '小米手环 8', goods_price: 259, goods_number: 600, goods_weight: 28, goods_state: 1, add_time: 1513085000, upd_time: 1513085000, hot_mumber: 1500, is_promote: true, goods_cat: '1,10,34', goods_introduce: '智能手环', pics: [], attrs: [] },
    { goods_id: '1028', goods_name: '尼康 Z8', goods_price: 27999, goods_number: 15, goods_weight: 910, goods_state: 0, add_time: 1513090000, upd_time: 1513090000, hot_mumber: 120, is_promote: false, goods_cat: '1,8,35', goods_introduce: '专业微单相机', pics: [], attrs: [] },
    { goods_id: '1029', goods_name: '惠普战66', goods_price: 4299, goods_number: 100, goods_weight: 1900, goods_state: 2, add_time: 1513095000, upd_time: 1513095000, hot_mumber: 380, is_promote: false, goods_cat: '1,3,36', goods_introduce: '商务笔记本', pics: [], attrs: [] },
    { goods_id: '1030', goods_name: 'Apple TV 4K', goods_price: 1699, goods_number: 120, goods_weight: 425, goods_state: 1, add_time: 1513100000, upd_time: 1513100000, hot_mumber: 240, is_promote: true, goods_cat: '1,14,37', goods_introduce: '网络电视盒子', pics: [], attrs: [] }
  ]
  return goods
})()

// 模拟商品列表接口
Mock.mock(/\/api\/goods(\?.*)?$/, 'get', (options) => {
  // 解析查询参数
  const url = new URL(options.url, 'http://localhost')
  const query = url.searchParams.get('query') || ''
  const pagenum = parseInt(url.searchParams.get('pagenum')) || 1
  const pagesize = parseInt(url.searchParams.get('pagesize')) || 10

  // 根据查询条件过滤商品
  let filteredGoods = cachedGoodsList
  if (query) {
    filteredGoods = cachedGoodsList.filter(good =>
      good.goods_name.toLowerCase().includes(query.toLowerCase())
    )
  }

  // 计算分页数据
  const total = filteredGoods.length
  const startIndex = (pagenum - 1) * pagesize
  const endIndex = startIndex + pagesize
  const paginatedGoods = filteredGoods.slice(startIndex, endIndex)

  return successResponse({
    total,
    pagenum,
    goods: paginatedGoods
  })
})

// 模拟商品详情查询
Mock.mock(/\/api\/goods\/\d+$/, 'get', (options) => {
  const id = options.url.match(/\/api\/goods\/(\d+)$/)[1]
  // 从缓存列表中查找对应的商品数据
  const good = cachedGoodsList.find(g => g.goods_id === id)

  if (good) {
    return successResponse(good)
  } else {
    return errorResponse('商品不存在')
  }
})

// 模拟添加商品
Mock.mock(/\/api\/goods$/, 'post', (options) => {
  const body = JSON.parse(options.body)

  // 生成新的商品ID（当前最大ID + 1）
  const maxId = Math.max(...cachedGoodsList.map(g => parseInt(g.goods_id)))
  const newId = String(maxId + 1)

  // 创建新商品对象
  const newGood = {
    goods_id: newId,
    goods_name: body.goods_name,
    goods_price: body.goods_price,
    goods_number: body.goods_number,
    goods_weight: body.goods_weight,
    goods_state: 0, // 默认为未审核
    add_time: Math.floor(Date.now() / 1000),
    upd_time: Math.floor(Date.now() / 1000),
    hot_mumber: 0,
    is_promote: false,
    goods_cat: body.goods_cat || '',
    goods_introduce: body.goods_introduce || '',
    pics: body.pics || [],
    attrs: body.attrs || []
  }

  // 添加到缓存列表的开头
  cachedGoodsList.unshift(newGood)

  return successResponse(newGood)
})

// 模拟编辑商品
Mock.mock(/\/api\/goods\/\d+$/, 'put', (options) => {
  const id = options.url.match(/\/api\/goods\/(\d+)$/)[1]
  const body = JSON.parse(options.body)

  // 从缓存列表中查找对应的商品索引
  const goodIndex = cachedGoodsList.findIndex(g => g.goods_id === id)

  if (goodIndex !== -1) {
    // 更新缓存中的商品数据
    cachedGoodsList[goodIndex] = {
      ...cachedGoodsList[goodIndex],
      goods_name: body.goods_name,
      goods_price: body.goods_price,
      goods_number: body.goods_number,
      goods_weight: body.goods_weight,
      goods_introduce: body.goods_introduce,
      upd_time: Math.floor(Date.now() / 1000),
      pics: body.pics || cachedGoodsList[goodIndex].pics,
      attrs: body.attrs || cachedGoodsList[goodIndex].attrs
    }

    return successResponse(cachedGoodsList[goodIndex])
  } else {
    return errorResponse('商品不存在')
  }
})

// 模拟删除商品
Mock.mock(/\/api\/goods\/\d+$/, 'delete', (options) => {
  const id = options.url.match(/\/api\/goods\/(\d+)$/)[1]

  // 从缓存列表中查找对应的商品索引
  const goodIndex = cachedGoodsList.findIndex(g => g.goods_id === id)

  if (goodIndex !== -1) {
    // 从缓存中删除商品
    cachedGoodsList.splice(goodIndex, 1)

    return successResponse(null)
  } else {
    return errorResponse('商品不存在')
  }
})

// 模拟商品状态修改
Mock.mock(/\/api\/goods\/\d+\/state\/\d+$/, 'put', () => {
  return successResponse({
    message: '状态修改成功'
  })
})

// 模拟商品分类
Mock.mock(/\/api\/categories/, 'get', () => {
  const categories = [
    {
      id: '1',
      cat_name: '家用电器',
      cat_pid: '0',
      cat_level: 0,
      cat_deleted: false,
      children: [
        {
          id: '11',
          cat_name: '电视',
          cat_pid: '1',
          cat_level: 1,
          cat_deleted: false,
          children: [
            { id: '111', cat_name: '智能电视', cat_pid: '11', cat_level: 2, cat_deleted: false },
            { id: '112', cat_name: 'OLED电视', cat_pid: '11', cat_level: 2, cat_deleted: false }
          ]
        },
        {
          id: '12',
          cat_name: '空调',
          cat_pid: '1',
          cat_level: 1,
          cat_deleted: false,
          children: [
            { id: '121', cat_name: '变频空调', cat_pid: '12', cat_level: 2, cat_deleted: false },
            { id: '122', cat_name: '中央空调', cat_pid: '12', cat_level: 2, cat_deleted: false }
          ]
        }
      ]
    },
    {
      id: '2',
      cat_name: '手机数码',
      cat_pid: '0',
      cat_level: 0,
      cat_deleted: false,
      children: [
        {
          id: '21',
          cat_name: '手机',
          cat_pid: '2',
          cat_level: 1,
          cat_deleted: false,
          children: [
            { id: '211', cat_name: '智能手机', cat_pid: '21', cat_level: 2, cat_deleted: false },
            { id: '212', cat_name: '老人机', cat_pid: '21', cat_level: 2, cat_deleted: false }
          ]
        },
        {
          id: '22',
          cat_name: '平板电脑',
          cat_pid: '2',
          cat_level: 1,
          cat_deleted: false
        }
      ]
    },
    {
      id: '3',
      cat_name: '服装服饰',
      cat_pid: '0',
      cat_level: 0,
      cat_deleted: false,
      children: [
        { id: '31', cat_name: '男装', cat_pid: '3', cat_level: 1, cat_deleted: false },
        { id: '32', cat_name: '女装', cat_pid: '3', cat_level: 1, cat_deleted: false }
      ]
    }
  ]

  return successResponse(categories)
})

// 模拟数据统计 - 基于时间的折线图（用户来源）
Mock.mock(/\/api\/reports\/type\/1$/, 'get', () => {
  return successResponse({
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    series: [
      {
        name: '直接访问',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '邮件营销',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '搜索引擎',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  })
})

// 模拟数据统计 - 关键指标卡片数据
Mock.mock(/\/api\/reports\/statistics$/, 'get', () => {
  return successResponse({
    totalUsers: 1250,
    totalGoods: 856,
    totalOrders: 3420,
    totalAmount: 125680
  })
})

// 模拟订单列表
Mock.mock(/\/api\/orders(\?.*)?$/, 'get', () => {
  const orders = []
  for (let i = 1; i <= 10; i++) {
    orders.push(
      Mock.mock({
        order_number: 'IT' + Date.now() + Mock.Random.integer(1000, 9999),
        order_price: '@integer(100,99999)',
        order_pay: i % 3 === 0 ? '0' : '1',
        is_send: i % 2 === 0 ? '是' : '否',
        pay_status: i % 2 === 0 ? '1' : '0',
        trade_no: '@string("number", 20)',
        user_id: Mock.Random.integer(1, 100),
        consignee_addr: '@county(true)',
        create_time: Date.now() - Mock.Random.integer(1, 60) * 60 * 1000,
        update_time: Date.now()
      })
    )
  }

  return successResponse({
    total: 10,
    pagenum: 1,
    goods: orders
  })
})

console.log('%c Mock API 已启动 🚀 ', 'background: #4CAF50; color: #fff; padding: 4px 12px; border-radius: 4px;')
console.log('%c 模拟数据服务运行中... ', 'background: #2196F3; color: #fff; padding: 4px 12px; border-radius: 4px;')

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

// 模拟商品列表
Mock.mock(/\/api\/goods(\?.*)?$/, 'get', () => {
  const goods = []
  const brands = ['Apple', '华为', '小米', 'OPPO', 'vivo', '三星', '联想', '戴尔', '索尼', 'LG']
  const categories = ['手机', '电脑', '平板', '耳机', '音响', '相机', '键盘', '鼠标', '充电器', '数据线']

  for (let i = 1; i <= 50; i++) {
    const brand = brands[Mock.Random.integer(0, brands.length - 1)]
    const category = categories[Mock.Random.integer(0, categories.length - 1)]
    goods.push(
      Mock.mock({
        goods_id: String(i + 1000),
        goods_name: brand + category + ' ' + Mock.Random.pick(['Pro', 'Max', 'Ultra', 'Plus', 'Lite', '标准版', '旗舰版']),
        goods_price: Mock.Random.integer(100, 19999),
        goods_number: Mock.Random.integer(0, 2000),
        goods_weight: Mock.Random.integer(100, 5000),
        goods_state: Mock.Random.integer(0, 1), // 0: 未审核, 1: 已审核
        add_time: Date.now() - Mock.Random.integer(1, 180) * 24 * 60 * 60 * 1000,
        upd_time: Date.now() - Mock.Random.integer(0, 30) * 24 * 60 * 60 * 1000,
        hot_mumber: Mock.Random.integer(0, 2000),
        is_promote: Mock.Random.boolean(),
        goods_cat: '1,' + Mock.Random.integer(1, 10) + ',' + Mock.Random.integer(1, 20)
      })
    )
  }

  return successResponse({
    total: 50,
    pagenum: 1,
    goods
  })
})

// 模拟商品详情查询
Mock.mock(/\/api\/goods\/\d+$/, 'get', (options) => {
  const id = options.url.match(/\/api\/goods\/(\d+)$/)[1]
  return successResponse({
    goods_id: id,
    goods_name: Mock.Random.ctitle(5, 15),
    goods_price: Mock.Random.integer(100, 9999),
    goods_number: Mock.Random.integer(1, 1000),
    goods_weight: Mock.Random.integer(100, 5000),
    goods_state: 1,
    add_time: Date.now() - Mock.Random.integer(1, 30) * 24 * 60 * 60 * 1000,
    upd_time: Date.now(),
    hot_mumber: Mock.Random.integer(0, 999),
    is_promote: Mock.Random.boolean(),
    goods_cat: '1,5,12',
    pics: [
      { pics_id: '1', pics_big: 'http://example.com/pic1.jpg', pics_mid: 'http://example.com/pic1_mid.jpg', pics_sma: 'http://example.com/pic1_sma.jpg' }
    ],
    attrs: [
      { attr_id: '1', attr_value: '黑色', attr_name: '颜色' },
      { attr_id: '2', attr_value: '128GB', attr_name: '容量' }
    ]
  })
})

// 模拟添加商品
Mock.mock(/\/api\/goods$/, 'post', () => {
  return successResponse({
    message: '添加商品成功'
  })
})

// 模拟编辑商品
Mock.mock(/\/api\/goods\/\d+$/, 'put', () => {
  return successResponse({
    message: '更新商品成功'
  })
})

// 模拟删除商品
Mock.mock(/\/api\/goods\/\d+$/, 'delete', () => {
  return successResponse({
    message: '删除商品成功'
  })
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

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

// 模拟用户列表接口
Mock.mock(/\/api\/users(\?.*)?$/, 'get', () => {
  const userList = []
  for (let i = 1; i <= 15; i++) {
    userList.push(
      Mock.mock({
        id: String(i + 1000),
        username: '@cname',
        email: '@email',
        mobile: /^1[3-9]\d{9}$/,
        role_name: i % 3 === 0 ? '超级管理员' : (i % 2 === 0 ? '管理员' : '普通用户'),
        mg_state: '@boolean'
      })
    )
  }

  return successResponse({
    total: 15,
    pagenum: 1,
    users: userList
  })
})

// 模拟用户状态修改
Mock.mock(/\/api\/users\/\d+\/state\/\w+/, 'put', () => {
  return successResponse({ msg: '状态修改成功' })
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
Mock.mock(/\/api\/users\/\d+/, 'delete', () => {
  return successResponse({ msg: '用户删除成功' })
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

export default {
  menus: {
    '/': '首页',
    home: '首页',
    // 父菜单翻译
    userManagement: '用户管理',
    rightsManagement: '权限管理',
    goodsManagement: '商品管理',
    ordersManagement: '订单管理',
    reportsManagement: '数据统计',
    // 子菜单翻译
    users: '用户列表',
    roles: '角色列表',
    rights: '权限列表',
    goods: '商品列表',
    params: '分类参数',
    categories: '商品分类',
    orders: '订单列表',
    reports: '数据报表'
  },
  login: {
    title: '用户登录',
    btnTitle: '登录'
  },
  user: {
    title: '用户管理',
    addUser: '添加用户',
    editUser: '编辑用户',
    search: '搜索',
    searchPlaceholder: '搜索用户',
    // 表格列
    id: 'ID',
    username: '用户名',
    email: '邮箱',
    mobile: '手机号',
    role: '角色',
    state: '状态',
    createTime: '创建时间',
    operation: '操作',
    // 表单
    usernamePlaceholder: '请输入用户名',
    emailPlaceholder: '请输入邮箱',
    mobilePlaceholder: '请输入手机号',
    rolePlaceholder: '请选择角色',
    // 消息提示
    addSuccess: '用户添加成功',
    updateSuccess: '用户信息更新成功',
    deleteSuccess: '删除成功',
    // eslint-disable-next-line no-template-curly-in-string
    deleteConfirm: '确定要删除用户 "{username}" 吗？此操作不可恢复！',
    fetchFailed: '获取用户列表失败',
    addFailed: '添加失败',
    updateFailed: '更新失败',
    deleteFailed: '删除失败',
    getUserFailed: '获取用户信息失败',
    // eslint-disable-next-line no-template-curly-in-string
    stateChangeSuccess: '用户 "{username}" 状态已"{state}"',
    stateChangeFailed: '状态修改失败',
    enabled: '启用',
    disabled: '禁用',
    // 角色
    superAdmin: '超级管理员',
    admin: '管理员',
    normalUser: '普通用户'
  },
  dialog: {
    deleteTitle: '确定要删除用户',
    confirm: '确定',
    cancel: '取消',
    deleteConfirmTitle: '删除确认'
  },
  table: {
    username: '姓名',
    email: '邮箱',
    mobile: '手机',
    role_name: '角色',
    mg_state: '状态',
    create_time: '创建时间',
    action: '操作',
    search: '搜索',
    adduser: '添加用户',
    placeholder: '请输入搜索的用户姓名'
  },
  message: {
    updeteSuccess: '更新成功'
  },
  driver: {
    doneBtnText: '完成',
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    guideBtn: '引导按钮',
    hamburgerBtn: '汉堡按钮',
    fullScreen: '全屏按钮'
  },
  common: {
    edit: '编辑',
    delete: '删除',
    confirm: '确定',
    cancel: '取消',
    pleaseEnter: '请输入',
    required: '不能为空'
  },
  reports: {
    title: '数据报表',
    last7Days: '最近7天',
    last30Days: '最近30天',
    last90Days: '最近90天',
    totalUsers: '总用户数',
    totalGoods: '总商品数',
    totalOrders: '总订单数',
    totalAmount: '总金额',
    userSourceTrend: '用户来源趋势',
    dataSourceDistribution: '数据来源分布',
    sourceDetails: '来源详细数据',
    source: '来源',
    monday: '周一',
    tuesday: '周二',
    wednesday: '周三',
    thursday: '周四',
    friday: '周五',
    saturday: '周六',
    sunday: '周日',
    total: '总计'
  }
}

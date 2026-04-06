export default {
  menus: {
    '/': 'home',
    home: 'home',
    // 父菜单翻译
    userManagement: 'User Management',
    rightsManagement: 'Rights Management',
    goodsManagement: 'Goods Management',
    ordersManagement: 'Orders Management',
    reportsManagement: 'Reports Management',
    // 子菜单翻译
    users: 'users list',
    roles: 'roles list',
    rights: 'permission list',
    goods: 'product list',
    params: 'sorting list',
    categories: 'goods category',
    orders: 'order list',
    reports: 'data report'
  },
  login: {
    title: 'user login',
    btnTitle: 'login'
  },
  user: {
    title: 'User Management',
    addUser: 'Add User',
    editUser: 'Edit User',
    search: 'Search',
    searchPlaceholder: 'Search users',
    // 表格列
    id: 'ID',
    username: 'Username',
    email: 'Email',
    mobile: 'Mobile',
    role: 'Role',
    state: 'State',
    operation: 'Operation',
    // 表单
    usernamePlaceholder: 'Please enter username',
    emailPlaceholder: 'Please enter email',
    mobilePlaceholder: 'Please enter mobile',
    rolePlaceholder: 'Please select role',
    // 消息提示
    addSuccess: 'User added successfully',
    updateSuccess: 'User updated successfully',
    deleteSuccess: 'Deleted successfully',
    // eslint-disable-next-line no-template-curly-in-string
    deleteConfirm: 'Are you sure you want to delete user "{username}"? This action cannot be undone!',
    fetchFailed: 'Failed to fetch user list',
    addFailed: 'Failed to add user',
    updateFailed: 'Failed to update user',
    deleteFailed: 'Failed to delete user',
    getUserFailed: 'Failed to get user info',
    // eslint-disable-next-line no-template-curly-in-string
    stateChangeSuccess: 'User "{username}" state has been "{state}"',
    stateChangeFailed: 'Failed to change state',
    enabled: 'Enabled',
    disabled: 'Disabled',
    // 状态
    superAdmin: 'Super Admin',
    admin: 'Admin',
    normalUser: 'Normal User'
  },
  dialog: {
    deleteTitle: 'Are you sure you want to delete the user ',
    confirm: 'Confirm',
    cancel: 'Cancel',
    deleteConfirmTitle: 'Delete Confirmation'
  },
  table: {
    username: 'username',
    email: 'email',
    mobile: 'mobile',
    role_name: 'role name',
    mg_state: 'state',
    create_time: 'create_time',
    action: 'action',
    search: 'search',
    adduser: 'add user',
    placeholder: 'Please enter a user name to search for'
  },
  message: {
    updeteSuccess: 'update successfully'
  },
  driver: {
    doneBtnText: 'done',
    closeBtnText: 'close',
    nextBtnText: 'next',
    prevBtnText: 'prev',
    guideBtn: 'guidebtn',
    hamburgerBtn: 'hamburgerBtn',
    fullScreen: 'fullScreen'
  },
  common: {
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
    pleaseEnter: 'Please enter',
    required: 'Required'
  },
  reports: {
    title: 'Data Reports',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    last90Days: 'Last 90 Days',
    totalUsers: 'Total Users',
    totalGoods: 'Total Goods',
    totalOrders: 'Total Orders',
    totalAmount: 'Total Amount',
    userSourceTrend: 'User Source Trend',
    dataSourceDistribution: 'Data Source Distribution',
    sourceDetails: 'Source Details',
    source: 'Source',
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
    total: 'Total'
  }
}

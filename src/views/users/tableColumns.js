/**
 * 用户管理表格列配置
 * 用于配置表格的列属性，包括属性名、国际化key、宽度等
 */
export const tableColumns = [
  {
    prop: 'id',
    labelKey: 'user.id',
    width: 80
  },
  {
    prop: 'username',
    labelKey: 'user.username',
    width: 120
  },
  {
    prop: 'email',
    labelKey: 'user.email',
    width: 180
  },
  {
    prop: 'mobile',
    labelKey: 'user.mobile',
    width: 120
  },
  {
    prop: 'role_name',
    labelKey: 'user.role',
    width: 100
  },
  {
    prop: 'mg_state',
    labelKey: 'user.state',
    width: 80,
    slot: 'state' // 自定义插槽名称
  },
  {
    prop: 'create_time',
    labelKey: 'user.createTime',
    width: 180,
    slot: 'time' // 自定义插槽名称
  },
  {
    prop: 'action',
    labelKey: 'user.operation',
    width: 200,
    slot: 'action' // 自定义插槽名称
  }
]

/**
 * 商品管理表格列配置
 * 用于配置表格的列属性，包括属性名、标签、宽度、是否需要自定义插槽等
 */
export const tableColumns = [
  {
    prop: 'goods_id',
    label: '商品ID',
    width: 100
  },
  {
    prop: 'goods_name',
    label: '商品名称',
    width: 300,
    showOverflowTooltip: true
  },
  {
    prop: 'goods_price',
    label: '价格',
    width: 120,
    slot: 'price'
  },
  {
    prop: 'goods_number',
    label: '数量',
    width: 100
  },
  {
    prop: 'goods_weight',
    label: '重量',
    width: 100,
    slot: 'weight'
  },
  {
    prop: 'goods_state',
    label: '状态',
    width: 100,
    slot: 'state'
  },
  {
    prop: 'hot_mumber',
    label: '热度',
    width: 100
  },
  {
    prop: 'is_promote',
    label: '促销',
    width: 80,
    slot: 'promote'
  },
  {
    prop: 'add_time',
    label: '创建时间',
    width: 180,
    slot: 'time'
  },
  {
    prop: 'action',
    label: '操作',
    width: 200,
    slot: 'action',
    fixed: 'right'
  }
]

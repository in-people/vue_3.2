import request from './request'

/**
 * 获取商品列表
 * @param {Object} params - 查询参数
 * @param {String} params.query - 查询关键词（商品名称）
 * @param {Number} params.pagenum - 当前页码
 * @param {Number} params.pagesize - 每页显示条数
 * @returns {Promise} 返回商品列表数据
 */
export function getGoodsList(params) {
  return request({
    url: '/goods',
    method: 'get',
    params
  })
}

/**
 * 添加商品
 * @param {Object} data - 商品数据
 * @param {String} data.goods_name - 商品名称
 * @param {String} data.goods_cat - 商品分类（逗号分隔）
 * @param {Number} data.goods_price - 价格
 * @param {Number} data.goods_number - 数量
 * @param {Number} data.goods_weight - 重量
 * @param {String} data.goods_introduce - 介绍
 * @param {Array} data.pics - 图片数组
 * @param {Array} data.attrs - 属性数组
 * @returns {Promise} 返回添加结果
 */
export function addGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}

/**
 * 根据 ID 查询商品
 * @param {String} id - 商品 ID
 * @returns {Promise} 返回商品详情
 */
export function getGoodsById(id) {
  return request({
    url: `/goods/${id}`,
    method: 'get'
  })
}

/**
 * 编辑商品提交
 * @param {String} id - 商品 ID
 * @param {Object} data - 商品数据
 * @param {String} data.goods_name - 商品名称
 * @param {Number} data.goods_price - 价格
 * @param {Number} data.goods_number - 数量
 * @param {Number} data.goods_weight - 重量
 * @param {String} data.goods_introduce - 介绍
 * @param {Array} data.pics - 图片数组
 * @param {Array} data.attrs - 属性数组
 * @returns {Promise} 返回更新结果
 */
export function updateGoods(id, data) {
  return request({
    url: `/goods/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除商品
 * @param {String} id - 商品 ID
 * @returns {Promise} 返回删除结果
 */
export function deleteGoods(id) {
  return request({
    url: `/goods/${id}`,
    method: 'delete'
  })
}

/**
 * 修改商品状态
 * @param {String} id - 商品 ID
 * @param {Boolean} state - 商品状态（true: 上架，false: 下架）
 * @returns {Promise} 返回修改结果
 */
export function updateGoodsState(id, state) {
  return request({
    url: `/goods/${id}/state/${state}`,
    method: 'put'
  })
}

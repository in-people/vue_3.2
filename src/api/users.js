import request from './request'

/**
 * 获取用户列表
 * @param {Object} params - 查询参数
 * @param {String} params.query - 查询关键词
 * @param {Number} params.pagenum - 当前页码
 * @param {Number} params.pagesize - 每页显示条数
 * @returns {Promise} 返回用户列表数据
 */
export function getUsersList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

/**
 * 添加用户
 * @param {Object} data - 用户数据
 * @returns {Promise} 返回添加结果
 */
export function addUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

/**
 * 根据 ID 查询用户
 * @param {String} id - 用户 ID
 * @returns {Promise} 返回用户详情
 */
export function getUserById(id) {
  return request({
    url: `/users/${id}`,
    method: 'get'
  })
}

/**
 * 编辑用户
 * @param {String} id - 用户 ID
 * @param {Object} data - 用户数据
 * @returns {Promise} 返回更新结果
 */
export function updateUser(id, data) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除用户
 * @param {String} id - 用户 ID
 * @returns {Promise} 返回删除结果
 */
export function deleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

/**
 * 修改用户状态
 * @param {String} id - 用户 ID
 * @param {Boolean} state - 用户状态（true: 启用，false: 禁用）
 * @returns {Promise} 返回修改结果
 */
export function updateUserState(id, state) {
  return request({
    url: `/users/${id}/state/${state}`,
    method: 'put'
  })
}

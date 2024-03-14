import request from '@/utils/request'

// 获取列表
export const getYunList = (data) => {
  return request({
    url: '/luckyNwa/list',
    method: 'post',
    data,
  })
}
// 获取oss列表
export const getOssList = (data) => {
  return request({
    url: '/sys/oss/list',
    method: 'post',
    data,
  })
}
// oss里的删除
export const delOssPic = (ids) => {
  return request({
    url: '/sys/oss/delete',
    method: 'post',
    data: ids,
  })
}
// 删除文件
export const delRemotePic = (ids, path) => {
  return request({
    url: '/luckyNwa/delRemotePic?path=' + path,
    method: 'post',
    data: ids,
  })
}
// 修改文件名称
export const modifyInfo = (data) => {
  return request({
    url: '/luckyNwa/modifyInfo',
    method: 'post',
    data,
  })
}
// 获取文件夹列表给下拉框
export const getFolderList = (data) => {
  return request({
    url: '/folder/list',
    method: 'post',
    data,
  })
}

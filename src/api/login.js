/*
 * @Author: luckyNwa
 * @Date: 2023-04-17 15:15:08
 */
import request from '@/utils/request'

export const genToken = (data) => {
  return request({
    url: '/luckyNwa/genToken',
    method: 'post',
    data,
  })
}

export const getQQ = () => {
  return request({
    url: '/luckyNwa/getQQCode',
    method: 'get',
  })
}

export const addFolder = (data) => {
  return request({
    url: '/folder/addFolder',
    method: 'post',
    data,
  })
}

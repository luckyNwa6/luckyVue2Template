import request from '@/utils/requestIdp'
import { param } from 'jquery'

export const genToken = (data) => {
  return request({
    // url: '/idpSys/login',
    url: '/luckyAdmin/sys/login',
    method: 'post',
    data,
  })
}
export const getQQ = () => {
  return request({
    // url: '/idpSys/getQQCode',
    url: '/luckyAdmin/sys/getQQCode',
    method: 'get',
  })
}
export const getPersonInfo = (param) => {
  return request({
    // url: '/idpSys/getPersonInfo',
    url: '/luckyAdmin/sys/getPersonInfo?openId=' + param,
    method: 'get',
  })
}

export const updateStatus = (data) => {
  return request({
    url: '/idpSys/updateStatus',
    method: 'post',
    data,
  })
}

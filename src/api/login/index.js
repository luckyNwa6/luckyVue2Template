import request from '@/utils/httpRequest'

export const reqLogin = (data) => {
  return request({
    url: request.adornUrl('/sys/login'),
    method: 'post',
    data,
  })
}
export const getQQ = () => {
  return request({
    url: request.adornUrl('/sys/getQQCode'),
    method: 'get',
  })
}
export const getPersonInfo = (param) => {
  return request({
    url: request.adornUrl('/sys/getPersonInfo?openId=' + param),
    method: 'get',
  })
}

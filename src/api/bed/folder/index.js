import request from '@/utils/httpRequest'
//获取文件夹列表
export function getFolderList(data) {
  return request({
    url: request.adornUrl('/bedFolder/list'),
    method: 'post',
    data: data,
  })
}

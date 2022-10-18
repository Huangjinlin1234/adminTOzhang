/**
 * @created by helin3 2019-04-11
 * @updated by
 * @description 字典请求API
 */
import { request } from 'xy-utils';
import backend from '@/config/constant/app.data.service';

/**
  * 数据字典查询
  * @param {*} param
  */
export function lookupQueryFn (params) {
  return request({
    url: backend.appOcaService + '/api/adminsmlookupdict/querylookupcode',
    method: 'get',
    params
  });
}

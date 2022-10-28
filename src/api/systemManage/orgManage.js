import request from '@/utils/request';

export function orgEditApi(params) {
  return request({
    url: '/console/api/s/org',
    method: 'POST',
    data: params
  });
}

export function queryOrgInfo(params) {
  return request({
    url: '/console/api/s/orgs/queryInfo',
    method: 'POST',
    data: params
  });
}

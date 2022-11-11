import request from '@/utils/request';

export function dutyEditApi(code) {
  return request({
    url: '/console/api/s/user/duty/listbyduty/' + code,
    method: 'GET'
  });
}

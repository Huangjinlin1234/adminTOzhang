// import { request } from 'xy-utils';
import request from "@/utils/request";
// import backend from "@/config/constant/app.data.service";
let backend = { console: "console" };
export function getTreeData(params) {
  return request({
    url: backend.console + "/api/s/queryRoleAll",
    method: "POST",
    params
  });
}
export function getTableData(params) {
  return backend.console + "/api/s/role/data/rules";
}
// 新增、删除数据权限
export function setDataRule(method, data) {
  return request({
    url: backend.console + "/api/s/role/data/rule",
    method,
    data
  });
}
// 查询数据权限列表
export function getDataRule(method, params) {
  return backend.console + "/api/s/role/data/rules";
}
// 查询资源权限
export function getRescRule(data) {
  return request({
    url: backend.console + "/api/s/role/resc/roleRescRules",
    method: "post",
    data
  });
}

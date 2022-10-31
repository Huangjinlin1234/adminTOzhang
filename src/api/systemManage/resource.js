// import { request } from 'xy-utils';
import request from "@/utils/request";
// import backend from '@/config/constant/app.data.service';
let backend = { console: "console" };
// 资源定义

// 获取资源树
export function getTreeData(params) {
  return request({
    url: backend.console + "/api/s/queryRescAll",
    method: "POST",
    params
  });
}
export function getTreeData2(params) {
  return backend.console + "/api/s/queryRescAll";
}
// 保存、修改、删除资源信息
export function setResource(method, data) {
  return request({
    url: backend.console + "/api/s/resource",
    method,
    data
  });
}
// 获取资源信息
export function getResource(params) {
  return request({
    url: backend.console + "/api/s/resource/" + params,
    method: "GET"
  });
}
// 保存、删除资源操作信息
export function setResOperation(method, data) {
  return request({
    url: backend.console + "/api/s/resc/act",
    method,
    data
  });
}
// 获取资源操作信息
export function getRescActs(params) {
  return backend.console + "/api/s/resc/rescActs";
}

// 资源权限

// 查询用户角色
export function getRoles(params) {
  return request({
    url: backend.console + "/api/s/queryRoleAll",
    method: "POST",
    params
  });
}
// 查询资源中文描述
export function getResCHNDescList(params) {
  return request({
    url: backend.console + "/api/s/user/resc/data",
    method: "POST",
    params
  });
}
// 查询资源中文描述
export function getResCHNDesc(params) {
  return backend.console + "/api/s/user/resc/data";
}

// 报表权限管理

// 查询产品——机构列表
export function getPrdOrgList() {
  return backend.console + "/api/s/prd/org/query";
}
// 查询资源中文描述
export function getRootType(data) {
  return request({
    url: backend.console + "/api/s/resc/rescActs",
    method: "POST",
    data
  });
}
// 设置角色资源权限
export function saveRescRoot(data) {
  return request({
    url: backend.console + "/api/s/role/resc/saveRule",
    method: "POST",
    data
  });
}
// 设置产品--机构权限
export function setProOrg(method, data) {
  return request({
    url: backend.console + "/api/s/prd/orgs",
    method,
    data
  });
}
// 查询产品列表
export function getProList(params) {
  return request({
    url: backend.console + "/api/prd/queryPrdInfoSeletor",
    method: "POST",
    params
  });
}

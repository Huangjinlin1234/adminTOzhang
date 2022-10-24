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

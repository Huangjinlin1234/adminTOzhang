// import { request } from 'xy-utils';
import request from "@/utils/request";
// import backend from '@/config/constant/app.data.service';
let backend = { console: "console" };
// 查询机构列表
export function getOrgList(params) {
  return backend.console + "/api/s/orgs/login/leage";
}

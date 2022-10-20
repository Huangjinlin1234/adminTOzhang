import request from "@/utils/request";

export function auth() {
  return request({
    url: "/e4a/api/login/pubkey",
    method: "post"
  });
}
export function login(data) {
  return request({
    url: "/e4a/api/oauth/token/bak",
    method: "post",
    data
  });
}

export function getInfo() {
  return request({
    url: "/e4a/api/session/info",
    method: "post"
  });
}

export function logout() {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post"
  });
}

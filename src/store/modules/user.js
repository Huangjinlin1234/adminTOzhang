import {
  auth,
  login,
  logout,
  getSessionInfoFn,
  encryptPassword
} from '@/api/user'
// import JSEncrypt from 'jsencrypt'
// import { getSystemName } from '@/utils/util'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { clientId, imageCode, usercode, password } = userInfo
    auth({ clientId, imageCode, usercode, password }).then((res) => {
      return new Promise((resolve, reject) => {
        login({
          clientId,
          grant_type: 'password',
          imageCode,
          usercode: usercode,
          password: encryptPassword(password)
        })
          .then((response) => {
            const { rows } = response
            commit('SET_TOKEN', rows)
            setToken(rows)
            console.log('yufp', yufp)
            yufp.sessionStorage.set('Authorization', rows)
            debugger
            getSessionInfoFn(rows)
              .then((res) => {
                console.log('res', res)
              })
              .catch((err) => {
                console.log('error', err)
              })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getSessionInfoFn(state.token)
        .then((response) => {
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { roles, name, avatar, introduction } = data
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          // removeToken()
          resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true })

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      // removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

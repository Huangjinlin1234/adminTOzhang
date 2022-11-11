<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-form-item>
        <el-input id="code" ref="imageCode" v-model="imageCode" type="text" placeholder="验证码" />
        <i class="yu-icon-details" />
      </el-form-item>
      <img class="yu-login-code" :src="imageCodePicture" @click="freshImageCodeFn">
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div>
        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import { genUUID } from '@/utils/index.js'
import JSEncrypt from 'jsencrypt'
import { getRSAPublicKey, getSystemName } from '@/utils/auth'
import {
  loginFn,
  getPubkey,
  getSessionInfoFn
} from '@/api/user'
export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value) {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      } else {
        callback(new Error('Please enter the correct user name'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin@111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      imageCode: '',
      clientId: '',
      imageUUID: genUUID(16, 16) + Date.parse(new Date()),
      imageCodePicture: this.freshImageCodeFn(),
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.clientId = genUUID(16, 16)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.freshImageCodeFn()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    // 登录密码加密
    encodePassword: function(pwd) {
      var encryptPwd = this.encryptPassword(pwd)
      // #TODO 不进行encodeURIComponent编码
      // var encodePwd = encodeURIComponent(encryptPwd);
      // return encodePwd;
      return encryptPwd
    },
    // 匹配密码加密
    encryptPassword: function(pwd) {
      var encryptor = new JSEncrypt()
      encryptor.setPublicKey(getRSAPublicKey())
      return encryptor.encrypt(pwd)
    },
    freshImageCodeFn() {
      // var clientId = genUUID(16, 16);
      this.imageCodePicture = '/e4a/api/codeImage?clientId=' + this.clientId + '&t=' + (new Date()).getTime()
      this.imageCode = ''
      return this.imageCodePicture
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      const _this = this
      this.loginForm = {
        usercode: this.loginForm.username,
        password: this.encryptPassword('admin@111'),
        imageCode: this.imageCode,
        clientId: this.clientId,
        grant_type: 'password'
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          getPubkey().then(response => {
            _this.handleLoginFn(_this.loginForm)
          })
          // this.$store.dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     console.log(3333)
          //     this.$router.push({ path: this.redirect || '/'});
          //     this.loading = false;
          //   })
          //   .catch(() => {
          //     this.loading = false;
          //   });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleLoginFn(data) {
      loginFn(data).then(response => {
          response = response.data;
        if (response && response.rows && response.code === '0') { // 1、登录成功
        
          console.log(111)
          this.getInfo(response.rows)
          //this.message = null
          // this.$store.commit('oauth/SET_TOKEN', {
          //   access_token: response.rows,
          //   expires_in: 99999
          // })
          console.log(111)
          
          
        } else {
          this.freshImageCodeFn()
        }
        if (response && response.code === '10000002') { // 2、首次登录
          var _this = this
          _this.$confirm(_this.$t('login.scdlmmxg'), _this.$t('component.msg_title'), {
            confirmButtonText: _this.$t('component.btn_confirm'),
            cancelButtonText: _this.$t('component.btn_cancel'),
            type: 'warning'
          }).then(function() {
            _this.freshImageCodeFn()
            // 保存 token信息用于修改密码后登出
            _this.$store.commit('oauth/SET_TOKEN', {
              access_token: response.access_token,
              expires_in: response.expires_in
            })
            const { access_token, expires_in } = response
            _this.localToken = { access_token, expires_in } // 暂存，此时还不能访问需要认证的资源
            _this.firstLoginRes = response
            _this.dialogVisible = true
            // _this.message = response.message ? response.message : _this.$t('login.scdlmmxg');
          })
        }
      }).catch((e) => {
        const response = e.response.data
        this.message = response.message || this.$t('login.dlsbqlxxtgly')
        this.freshImageCodeFn()
      })
    },
    getInfo(data) {
      getSessionInfoFn(data).then(response => {
            console.log(response)
          })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

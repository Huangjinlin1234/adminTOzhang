<template>
  <div class="navbar yu-frame-top-bar">
    <div class="yu-frame-top-bar-left" />
    <div class="nav-right">
      <div class="yu-userInfo">
        <div class="yu-framer-user">
          <img src="../../assets/common/zrcbank/images/头部-营业时间.png" alt="">
          <span>营业日期：2022-09-24</span>
        </div>
        <div id="more" class="yu-framer-role">
          <img src="../../assets/common/zrcbank/images/头部-头像.png" alt="">
          <div class="yu-framer-role-user">
            <b class="userrolename">系统管理员&nbsp;admin</b>
            <div>系统管理员角色</div>
          </div>
          <div class="yu-framer-popover">
            dd
          </div>
        </div>
        <div class="arrow-hover"><i class="el-icon-arrow-down" style="cursor: pointer" /></div>

        <div class="yu-framer-tool">
          <i class="el-icon-share" />
          <i class="el-icon-delete" />
          <i id="yu-more" class="el-icon-star-off" />
          <i id="yu-exit" class="el-icon-close" style="cursor: pointer" />
        </div>
      </div>
      <!-- <div id="yu-sysTools" class="yu-sysTools"></div> -->
      <!-- <div>
                <div>
                    <img src="themes/default/images/userPic.png" alt="">
                </div>
            </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import ErrorLog from '@/components/ErrorLog';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import Search from '@/components/HeaderSearch';

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data() {
    return {
      pwdDialogVisible: false,
      isShow: false,
      formdata: {},
      dutys: '',
      dataCode: {
        '1': '业务审批退回',
        '2': '业务终审通过',
        '3': '业务终审否决',
        '4': '档案延期归还',
        '5': '工作日历待办'
      },
      openday: '2022-09-16',
      // openday: yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2),
      updateUrl: '/api/wbmsgnotice/update',
      timer: null,
      msgTimer: null
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 104px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;

}
</style>

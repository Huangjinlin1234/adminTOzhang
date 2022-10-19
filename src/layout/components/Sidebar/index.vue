<template>
  <div class="sibar-container">
    <div class="search-content">
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="19">
          <el-input
            v-model="input"
            placeholder="搜索快捷菜单..."
            prefix-icon="el-icon-search"
          />
        </el-col>
        <el-col :span="5">
          <div class="icont-menu">
            <i class="el-icon-menu" />
          </div>
        </el-col>
      </el-row>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';

export default {
  components: { SidebarItem },
  data () {
    return {
      input: ''
    };
  },

  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu () {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo;
    },
    variables () {
      return variables;
    },
    isCollapse () {
      return !this.sidebar.opened;
    }
  },
  created () {
    console.log(this.permission_routes, 'permission_routes');
  }
};
</script>
<style lang="scss" scoped>
.sibar-container{
  position: absolute;
  width: 240px;
  margin-top: -32px;
  .search-content{
    height: 42px;
    background-color: #0c2750;
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view .el-menu {
      background-color: red;
    }
    .icont-menu{
      font-size: 20px;
      height: 42px;
      text-align: center;
      line-height: 42px;
    }
  }
  .el-menu-item {}
}
.el-menu-item.is-active{
  background-color: yellow;
}
</style>

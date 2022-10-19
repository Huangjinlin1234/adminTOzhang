const dialog = {
  data () {
    return {
      showDialog: false,
      dialogTitle: '',
      pageType: ''
    };
  },
  methods: {
    openDialog (type, module) {
      this.pageType = type;
      this.showDialog = !this.showDialog;
    },
    cancelUser (sysModule) {
      if (this.selections.length < 1) {
        this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      if (this.userInfo.status == '0') {
        this.$message({message: '已注销用户不能注销', type: 'warning'});
        return;
      }
      this.$confirm('是否注销用户?', '提示', {type: 'warning'}).then(() => {
        this.$request({
          method: 'DELETE',
          url: backend.console + '/api/s/' + sysModule,
          data: this.userInfo
        }).then(res => {
          if (res.code === '0') {
          }
        });
      });
    }
  }
};
export default dialog;
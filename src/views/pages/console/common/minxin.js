const dialog = {
  data() {
    return {
      showDialog: false,
      dialogTitle: '',
      pageType: ''
    };
  },
  methods: {
    openDialog(type, ref, info, filed) {
      this.pageType = type;
      if (type !== 'ADD' && !this[info][filed]) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$refs[ref].dialogVisible = true;
    }

  }
};
export default dialog;
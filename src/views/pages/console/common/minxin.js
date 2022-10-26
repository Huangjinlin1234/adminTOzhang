const dialog = {
  data() {
    return {
      showDialog: false,
      dialogTitle: '',
      pageType: ''
    };
  },
  methods: {
    openDialog(type, ref) {
      this.pageType = type;
      this.$refs[ref].dialogVisible = true;
    }

  }
};
export default dialog;
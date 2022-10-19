<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultDashboard from './default';
import editorDashboard from './editor';

export default {
  name: 'Dashboard',
  components: { DefaultDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'DefaultDashboard'
    };
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  }
};
</script>

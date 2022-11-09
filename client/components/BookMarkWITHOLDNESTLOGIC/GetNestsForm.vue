<!-- Gets the bookmark nests aka folders for a particular user -->

<template>
    
</template>

<script>
export default {
  name: 'GetNestsForm',
  data() {
    return {
      value:this.$store.state.nestfilter,
          alerts: {}
    }
  },
  methods: {
    async submit() {
      const url = '/api/bookmarknests';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateNests', res);
      } catch (e) {
        // NOT NEEDED SINCE THE FILTERING OPTION IS NOT AVAILABLE FOR FREET DRAFT
        if (this.value === this.$store.state.nestfilter) {
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateNestFilter', null);
          this.value = ''; // Clear filter to show all users' freets
          this.$store.commit('refreshNests');
        } else {
          // Otherwise reset to previous fitler
          this.value = this.$store.state.nestfilter;
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
}
</script>

<style>

</style>
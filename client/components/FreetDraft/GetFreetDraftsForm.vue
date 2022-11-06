<!-- Form for getting freetdrafts (all, from user) (inline style) -->
<template>
</template>

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetFreetDraftsForm',
  // mixins: [InlineForm],
  data() {
    // return {value: this.$store.state.filter};
    return {value:this.$store.state.username}
  },
  methods: {
    async submit() {
      // const url = this.value ? '/api/freetdrafts': '';
      const url = '/api/freetdrafts';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        // this.$store.commit('updateFilter', this.value); //NOT NEEDED FOR FREET DRAFTS SINCE THE FILTERING IS BY SIGNED IN PERSON
        this.$store.commit('updateFreetDrafts', res);
      } catch (e) {
        // NOT NEEDED SINCE THE FILTERING OPTION IS NOT AVAILABLE FOR FREET DRAFT
        // if (this.value === this.$store.state.filter) {
        //   // This section triggers if you filter to a user but they
        //   // change their username when you refresh
        //   this.$store.commit('updateFilter', null);
        //   this.value = ''; // Clear filter to show all users' freets
        //   this.$store.commit('refreshFreetDrafts');
        // } else {
        //   // Otherwise reset to previous fitler
        //   this.value = this.$store.state.filter;
        // }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

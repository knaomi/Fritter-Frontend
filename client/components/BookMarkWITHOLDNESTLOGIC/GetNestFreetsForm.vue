<!-- Form for getting freets in a specific nest (all, from user) (inline style) -->
<template>
  
</template>
<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetNestFreetsForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.nestfilter};
  },
  methods: {
    async submit() {
    // TODO: IMPLEMENT THIS URL IN BOOKMARKNESTS
      const url = this.value ? `/api/bookmarknests?nestname=${this.value}` : '/api/bookmarks';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        console.log("innestfreetform, res:", res)
        console.log("value:", this.value)
        this.$store.commit('updateNestFilter', this.value);
        this.$store.commit('updateBookMarks', res);
      } catch (e) {
        if (this.value === this.$store.state.nestfilter) {
        // TODO: It is not possible to change the name of a bookmarknest so this may never execute
          // This section triggers if you filter to a user but they
          // change the nest when you refresh
          // this.$store.commit('updateNestFilter', null);
          // this.value = ''; // Clear filter to show all users' bookmarked freets
          // this.$store.commit('refreshBookMarks');
        } else {
          // Otherwise reset to previous fitler
          this.value = this.$store.state.nestfilter;
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

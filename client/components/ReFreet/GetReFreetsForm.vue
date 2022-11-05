<!-- Form for getting refreets (all, from user) (inline style) -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetReFreetsForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.refreetfilter};
  },
  methods: {
    async submit() {
      const url = this.value ? `/api/refreets?author=${this.value}` : '/api/refreets';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateReFreetFilter', this.value);
        this.$store.commit('updateReFreets', res);
      } catch (e) {
        if (this.value === this.$store.state.refreetfilter) {
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateReFreetFilter', null);
          this.value = ''; // Clear refreetfilter to show all users' refreets
          this.$store.commit('refreshReFreets');
        } else {
          // Otherwise reset to previous filter
          this.value = this.$store.state.refreetfilter;
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

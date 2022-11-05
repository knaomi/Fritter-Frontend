<!-- Form for getting downfreets (all, from user) (inline style)
 -->


<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetDownFreetsForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.downfreetfilter};
  },
  methods: {
    async submit() {
      // TODO If store value is none, you want no downfreeets to be returned. This should be set to an empty string
      const url = this.value ? `/api/downfreets?author=${this.value}` : '/api/downfreets';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateDownFreetFilter', this.value);
        this.$store.commit('updateDownFreets', res);
      } catch (e) {
        if (this.value === this.$store.state.downfreetfilter) {
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateDownFreetFilter', null);
          this.value = ''; // Clear filter to show the logged in user's downfreets 
          this.$store.commit('refreshDownFreets');
        } else {
          // Otherwise reset to previous downfreet filter
          this.value = this.$store.state.downfreetfilter;
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

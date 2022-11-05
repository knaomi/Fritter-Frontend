<!-- Form for getting likes (all, from user) (inline style)
 -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetLikesForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.likefilter};
  },
  methods: {
    async submit() {
      // TODO If store value is none, you want no likes to be returned. This should be set to an empty string
      const url = this.value ? `/api/likes?author=${this.value}` : '/api/likes';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateLikeFilter', this.value);
        this.$store.commit('updateLikes', res);
      } catch (e) {
        if (this.value === this.$store.state.likefilter) {
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateLikeFilter', null);
          this.value = ''; // Clear filter to show the logged in user's likes 
          this.$store.commit('refreshLikes');
        } else {
          // Otherwise reset to previous like filter
          this.value = this.$store.state.likefilter;
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

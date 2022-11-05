<!-- Form for creating freetdrafts (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFreetDraftForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/freetdrafts',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content', value: ''}
      ],
      title: 'Create a freetdraft',
      refreshFreetDrafts: true,
      callback: () => {
        const message = 'Successfully created a freetdraft!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

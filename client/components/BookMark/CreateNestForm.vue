<!-- Creates a new bookmarknest for a user-->
<!-- Form for registering an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateNestForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/bookmarknests',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'nestname', label: 'NestName', value: ''},
      ],
      title: 'Create a new Nest',
      callback: () => {
        const message = 'Successfully created a new nest!';
        this.$router.push({name: 'BookMarks'});
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

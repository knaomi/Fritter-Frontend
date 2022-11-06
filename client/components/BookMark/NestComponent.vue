<!-- Contains the information for each nest as seen by the user on the BookMark Page.
If a user selects one nest, they'll be led to the NestFreetsPage Component. 
TODO: THE ABOVE IS FUTURE IMPLEMENTATION -->

<template>
  <article
    class="nest"
  >
    <header>
      <h3 class="author">
        @{{ nest.author }}
      </h3>

    </header>
      {{ nest.nestname }}

    <p class="info">
      Created at {{ nest.dateCreated }}
      <i v-if="nest.edited">(edited)</i>
    </p>

    <div
        v-if="$store.state.username === nest.author"
        class="actions"
    >
        <button @click="deleteNest">
          🗑️ Delete
        </button>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>

export default {
  name: 'NestComponent',
  props: {
    // Data from the stored nest
    nest: {
      type: Object,
      required: true
    }
  },
// TODO ADD THE COMPONENTS THAT ARE IN USE
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
    //   draft: this.freet.content, // Potentially-new content for this freet
      alerts: {} // Displays success/error messages encountered during nest modification
    };
  },
  methods: {
    deleteNest() {
      /**
       * Deletes this nest.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted nest!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the nest's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/bookmarknests/${this.nest._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshNests');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.nest {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
</style>


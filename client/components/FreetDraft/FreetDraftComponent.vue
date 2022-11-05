<!-- Reusable component representing a single freetdraft and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="freetdraft"
  >
    <header>
      <h3 class="author">
        @{{ freetdraft.author }}
      </h3>
      <div
        v-if="$store.state.username === freetdraft.author"
        class="actions"
      >
        <button
          v-if="editing"
          @click="submitEdit"
        >
          ✅ Save changes
        </button>
        <button
          v-if="editing"
          @click="stopEditing"
        >
          🚫 Discard changes
        </button>
        <button
          v-if="!editing"
          @click="startEditing"
        >
          ✏️ Edit
        </button>
        <button @click="deleteFreetDraft">
          🗑️ Delete
        </button>
      </div>
    </header>
    <textarea
      v-if="editing"
      class="content"
      :value="draft"
      @input="draft = $event.target.value"
    />
    <p
      v-else
      class="content"
    >
      {{ freetdraft.content }}
    </p>
    <p class="info">
      Created at {{ freetdraft.dateModified }}
      <i v-if="freetdraft.edited">(edited)</i>
    </p>
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
  name: 'FreetDraftComponent',
  props: {
    // Data from the stored freetdraft
    freetdraft: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this freetdraft is in edit mode
      draft: this.freetdraft.content, // Potentially-new content for this freetdraft
      alerts: {} // Displays success/error messages encountered during freetdraft modification
    };
  },
  methods: {
    startEditing() {
      /**
       * Enables edit mode on this freetdraft.
       */
      this.editing = true; // Keeps track of if a freetdraft is being edited
      this.draft = this.freetdraft.content; // The content of our current "draft" while being edited
    },
    stopEditing() {
      /**
       * Disables edit mode on this freetdraft.
       */
      this.editing = false;
      this.draft = this.freetdraft.content;
    },
    deleteFreetDraft() {
      /**
       * Deletes this freetdraft.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted freetdraft!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    submitEdit() {
      /**
       * Updates freetdraft to have the submitted draft content.
       */
      if (this.freetdraft.content === this.draft) {
        const error = 'Error: Edited freetdraft content should be different than current freetdraft content.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: 'PATCH',
        message: 'Successfully edited freetdraft!',
        body: JSON.stringify({content: this.draft}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freetdraft's endpoint
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
        const r = await fetch(`/api/freetdrafts/${this.freetdraft._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshFreetDrafts');

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
.freetdraft {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
</style>

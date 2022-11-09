<!-- Contains the information for each nest as seen by the user on the BookMark Page.
If a user selects one nest, they'll be led to the NestFreetsPage Component. 
TODO: THE ABOVE IS FUTURE IMPLEMENTATION -->

<template>
  <article
    class="nest"
  >
    <header>
      <h3 class="name">
        {{ nest.nestname }}
      </h3>

    </header>
  
    <!-- <p class="info">
      Created at {{ nest.dateCreated }}
      <i v-if="nest.edited">(edited)</i>
    </p> -->

    <article
        class="actions"
    >
      <button @click="deleteNest">
        🗑️ Delete
      </button>

    </article>

    <div
      v-if="!this.isUserViewingFreetsInNest"
       class="notViewing"
      >
        <button @click="seeNestFreets">
            See Bookmarked Freets in Nest
        </button>
    
    </div>
   
    <div v-else
    class="viewing"
    >
      <button 
      @click="hideNestFreets">
          Hide view 
      </button>
      <!-- ROOM FOR IMPROVEMENT: DISPLAY THIS IN A SIDE PANEL -->
      <!-- <FreetComponent
        v-for="freet in $store.state.bookmarks"
        :key="freet.id"
        :freet="freet"
      /> -->
      {{$store.state.freets}}
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

import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'NestComponent',
  props: {
    // Data from the stored nest
    nest: {
      type: Object,
      required: true
    }
  },

  components:{
      FreetComponent,
  },

  data() {
    return {
      isUserViewingFreetsInNest: false,
      alerts: {} // Displays success/error messages encountered during nest modification
    };
  },
  methods: {

    seeNestFreets(){
      this.isUserViewingFreetsInNest = true;
      this.getFreetsInNest();
    },
    hideNestFreets(){
      this.isUserViewingFreetsInNest = false;
    },

    getFreetsInNest(){
      /**
       * Gets all the freets in the nest
       */
      const params = {
        method: 'GET',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully got all likedfreet!', status: 'success'
          });
        }
      };
      this.requestNestFreets(params); 
    },

    async requestNestFreets(params) {
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
        const r = await fetch(`/api/bookmarknests?nestname=${this.nest.nestname}`, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$store.commit('updateNestFilter', this.nest.nestname)
        this.$store.commit('updateBookMarks', res);
        // this.$store.commit('refreshBookMarks') // This one makes the call again which is unnecessary
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },

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
.viewing button{
  background-color: lightblue;

}
</style>


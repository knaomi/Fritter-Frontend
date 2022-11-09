<!-- Reusable component representing a single refreet and its actions -->

<template>
    <div
        v-if="!this.isUserReFreetsFreet"
        class="notrefreeting"
        >
            <button 
            @click="addReFreet">
               🔃ReFreet
            </button>
    </div>
   <p
      v-else
      class="refreeting"
    >
        <button 
        @click="deleteReFreet">
            🔃ReFreet
        </button>
    </p>
</template>

<script>
export default {
  name: 'CreateReFreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      alerts: {}
      }
  },
  mounted(){
    // this.$store.commit('refreshReFreets');
  },
  computed:{
    isUserReFreetsFreet(){
    this.getReFreetsbyAuthor()
      const freetids = (this.$store.state.refreets).map(freet =>freet._id)
      return (freetids).includes(this.freet._id)
      // const freetsids = [];
      // for (const freet of this.$store.state.downfreets){
      //   freetsids.push(freet._id)
      // };
      // return freetsids.includes(this.freet._id);
    },
  },

// TODO: IMPLEMEMT THE METHODS BELOW AND MAKE SURE THAT THE FREET IS UPDATED EFFECTIVELY
  methods:{
    getReFreetsbyAuthor(){
      const params = {
        method: 'GET',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully got all refreeted freets!', status: 'success'
          });
        }
      };
      this.getrequest(params); 
    },
    async getrequest(params) {
      /**
       * Submits a request to the refreets's endpoint
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
        const r = await fetch(`/api/refreets?authorId=${this.store.state.username}`, options);
        const res = await r.json();
        if (!r.ok) {
          // const res = await r.json();
          throw new Error(res.error);
        }
        // this.$store.commit('refreshReFreets');
        this.$store.commit('updateReFreets', res)

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },  
    addReFreet(){
    /**
     * Creates a new refreet for the freet by the logged in user
     */
     const params = {
        method: 'POST',
        body: JSON.stringify({freetid: this.freet._id}),
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully refreeted freet!', status: 'success'
          });
        }
      };
      this.request(params);   
    },

    deleteReFreet(){
      /**
       * Removes the refreet on the freet by the logged in user
       */

    const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted  refreet on freet!', status: 'success'
          });
        }
      };
      this.request(params); 

    },

    async request(params) {
      /**
       * Submits a request to the refreet's endpoint
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
      const r = await fetch(params.method === 'POST' ? `/api/refreets` : `/api/refreets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshReFreets');
        
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }   
  }


}
</script>

<style>

.refreeting button{
    background-color: lightblue;
}

</style>

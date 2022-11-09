<!-- Reusable component representing a single downfreet and its actions -->

<template>
    <div
        v-if="!this.isUserDownFreetsFreet"
        class="notdownfreeting"
        >
            <button 
            @click="addDownFreet">
               ⤵️DownFreet
            </button>
    </div>
   <p
      v-else
      class="downfreeting"
    >
        <button 
        @click="deleteDownFreet">
            ⤵️DownFreet
        </button>
    </p>
</template>

<script>
export default {
  name: 'CreateDownFreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
     return {
      alerts: {}
      }
  },
  mounted(){
    this.$store.commit('refreshDownFreets');
    this.$store.commit('refreshLikes');
  },

  computed:{
    isUserDownFreetsFreet(){

      this.getDownFreetsbyAuthor()
      // const freetids =  (this.$store.state.downfreets).map(freet =>freet._id)
      // return (freetids).includes(this.freet._id)
      const freetsids = [];
      for (const freet of this.$store.state.downfreets){
        freetsids.push(freet._id)
      };
      return freetsids.includes(this.freet._id);
     
    }
  },

  methods:{
   getDownFreetsbyAuthor(){
      const params = {
        method: 'GET',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully got all downfreeted freets!', status: 'success'
          });
        }
      };
      this.getrequest(params); 
    },
    async getrequest(params) {
      /**
       * Submits a request to the downfreets's endpoint
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
        const r = await fetch(`/api/downfreets?authorId=${this.store.state.username}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshDownFreets');
        this.$store.commit('refreshLikes');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },  
    addDownFreet(){
    /**
     * Creates a new downfreet for the freet by the logged in user
     */
      const params = {
        method: 'POST',
        body: JSON.stringify({freetid: this.freet._id}),
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully downfreeted freet!', status: 'success'
          });
        }
      };
      this.request(params);     
    },

    deleteDownFreet(){
    /**
     * Deletes the downfreet for the freet by the logged in user
     */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted  downfreet on freet!', status: 'success'
          });
        }
      };
      this.request(params); 

    },
    async request(params) {
      /**
       * Submits a request to the downfreet's endpoint
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
        const r = await fetch(params.method === 'POST' ? `/api/downfreets` : `/api/downfreets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshDownFreets');
        this.$store.commit('refreshLikes');

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

.downfreeting button{
    background-color: lightblue;
}

</style>

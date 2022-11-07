<template>
    <div
        v-if="!this.isUserLikesFreet"
        class="notliking"
        >
            <button 
            @click="addLike">
                🤍Add Like
            </button>
    </div>
   <p
      v-else
      class="liking"
    >
        <button 
        @click="deleteLike">
            ❤️  Like
        </button>
    </p>
</template>

<script>
export default {
  name:'CreateLikeComponent',
  data() {
     return {
      alerts: {}
      }
  },
  mounted(){
    this.$store.commit('refreshLikes');
  },
  computed:{
    isUserLikesFreet(){
      
      const likesonfreet= (this.$store.state.likes).filter(item => item.originalFreet === this.freet._id)
      
      const authorsOfLikesOnFreet = likesonfreet.filter(item => item.author.toString() === this.freet.author.toString())
      return  authorsOfLikesOnFreet.length !== 0;

    }
  },
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },

// TODO: IMPLEMEMT THE METHODS BELOW AND MAKE SURE THAT THE FREET IS UPDATED EFFECTIVELY
  methods:{

    addLike(){
    /**
     * Creates a new like for the freet by the logged in user
     */
      const params = {
        method: 'POST',
        body: JSON.stringify({freetid: this.freet._id}),
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully liked freet!', status: 'success'
          });
        }
      };
      this.request(params);    
    },

    deleteLike(){
      /**
       * Deletes a new like for the freet by the logged in user
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted  like on freet!', status: 'success'
          });
        }
      };
      this.request(params);        

    },
    async request(params) {
      /**
       * Submits a request to the like's endpoint
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
        const r = await fetch(params.method === 'POST' ? `/api/likes` : `/api/likes/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshLikes');
        this.$store.commit('refreshDownFreets');
        // TODO : CALL HERE FOR UPDATING NUMBER OF LIKES IN STORE // NO NEED ITS DYNAMIC

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

.liking button{
    background-color: lightblue;
}

</style>

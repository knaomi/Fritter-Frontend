<!-- Reusable component representing a single bookmark and its actions -->

<template>
    <div
        v-if="!this.isUserBookMarksFreet"
        class="notbookmarking"
        >
            <button 
            @click="addBookMark">
              📁 Add Bookmark
            </button>
    </div>
   <p
      v-else
      class="bookmarking"
    >
        <button 
        @click="deleteBookMark">
             📁 Bookmark
        </button>
    </p>
</template>

<script>
export default {
  name:'CreateBookMarkComponent',
  data() {
     return {
      alerts: {}
      }
  },
  mounted(){
    // this.$store.commit('refreshBookMarks');
  },
  computed:{
    isUserBookMarksFreet(){
      this.getBookMarksbyAuthor()
    // //   const freetids = (this.$store.state.bookmarks).map(freet =>freet._id)
    // //   return (freetids).includes(this.freet._id)
    const freetsids = [];
      for (const freet of this.$store.state.bookmarks){
        freetsids.push(freet._id)
      };
      return freetsids.includes(this.freet._id);
    // return this.$store.state.bookmarks.includes(this.freet)
   
    }
  },
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },

  methods:{
    getBookMarksbyAuthor(){
      const params = {
        method: 'GET',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully got all bookmarked freet!', status: 'success'
          });
        }
      };
      this.getrequest(params); 
    },
    async getrequest(params) {
      /**
       * Submits a request to the bookmarks's endpoint
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
        const r = await fetch(`/api/bookmarks`, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$store.commit('updateBookMarks', res);
       

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },  
    addBookMark(){
    /**
     * Creates a new bookmark for the freet by the logged in user
     */
      const params = {
        method: 'POST',
        body: JSON.stringify({freetid: this.freet._id}),
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully bookmarked freet!', status: 'success'
          });
        }
      };
      this.request(params);    
    },

    deleteBookMark(){
      /**
       * Deletes a new bookmark for the freet by the logged in user
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted  bookmark on freet!', status: 'success'
          });
        }
      };
      this.request(params);        

    },
    async request(params) {
      /**
       * Submits a request to the bookmark's endpoint
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
        const r = await fetch(params.method === 'POST' ? `/api/bookmarks` : `/api/bookmarks/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshBookMarks');

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

.bookmarking button{
    background-color: lightblue;
}

</style>

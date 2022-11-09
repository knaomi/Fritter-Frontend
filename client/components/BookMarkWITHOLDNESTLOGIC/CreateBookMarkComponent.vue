<template>
    <div
        v-if="!isUserBookMarksFreet"
        class="notbookmarking"
        >
            <button 
            @click="addBookMark">
                <!-- 🔖📂AddBookMark -->
                AddBookMark
                <!-- TODO: IF OVERLAY IS USED DISPLAY NESTS OVER HERE -->
            </button>
            <!-- DISPLAY ONLY NESTNAMES AND LET PERSON PICK -->
            <!-- ADD ANOTHER V-ON BELOW THAT WAITS FOR USER TO CREATE A NAME & CHECK FOR ERRORS -->
            <DisplayNestOptions
              v-for="nest in $store.state.nests"
              :key="nest.id"
              v-bind:nestname="nest.nestname"
              v-on:picknest="addBookMark"
            />
            
    </div>
   <p
      v-else
      class="bookmarking"
    >
        <button 
        @click="deleteBookMark">
            <!-- 📁🗂📌BookMark -->
            BookMark
        </button>
    </p>
</template>

<script>

import DisplayNestOptions from '@/components/BookMark/DisplayNestOptions.vue';

export default {
  name:'CreateBookMarkComponent',
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
  components:{
    DisplayNestOptions,
  },
  computed:{
    isUserBookMarksFreet(){
      this.getBookMarksbyAuthor()
      const freetids = (this.$store.state.bookmarks).map(freet =>freet._id)
      return (freetids).includes(this.freet._id)
     
    }
  },

// TODO: IF TIME, GET USER TO ALSO CREATE A NEW NEST SIMULTANEOUSLY BY ADDING A NEW NEST
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
        const r = await fetch(params.method === `/api/bookmarks`, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        console.log("found all usrrs bookmarks", res)
        this.store.commit('updateNestFilter', null);
        this.$store.commit('updateBookMarks', res);

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },  
    addBookMark(nestname){
    /**
     * Creates a new bookmark for the freet by the logged in user
     * in the nest they picked
     */
   
    
    this.$store.commit('refreshNests');
     const params = {
        method: 'POST',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully bookmarked freet!', status: 'success'
          });
        }
      };
      this.postInExistingNestRequest(params, nestname);  
      console.log("listener event in bookmarks works well", this.$store.state.bookmarks)
    },

    async postInExistingNestRequest(params, nestname) {
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
          const r = await fetch(`/api/bookmarknests/${nestname}/bookmarks/${this.freet._id}`, options);
          const res = await r.json();
          if (!r.ok) {
            throw new Error(res.error);
          }
          console.log("res returned after posting", res)
          this.$store.commit('refreshBookMarks');
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
    },

    deleteBookMark(){
      /**
       * Deletes the bookmark on the given feet by the logged in user
       */
      con
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
        // very buggy - make changes
        // TODO BUG: GET bookmarkID FOR THIS PARTICULAR ON FREETin backend from bookmark model to ensure unformity 
        // since this code is also used for posting
        const r = await fetch(`/api/bookmarks/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshBookMarks');
        // TODO: CALL HERE FOR UPDATING NUMBER OF BookMarks IN STORE || NO NEEED!!!! DYNAMIC VIA GETTERS

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


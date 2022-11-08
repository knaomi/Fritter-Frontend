import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    test: "I hope on refreshing page I am around",
    username: null, // Username of the logged in user
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    refreetfilter:null, // Username to filter shown freets by (null = show all)
    refreets:[], //all the refreets created by a specific user
    downfreetfilter:null, // Username to filter shown dwonfreets by (null = show all by logged in user) 
    downfreets:[], // all the downfreets created by a specific user
    likefilter:null, //Username to filter shown likes by (null = show all by logged in user)
    likes: [], // all the likes created by a specific user
    nestfilter:null, // nestname to filter shown bookmarked freets by (null =  show all by logged in user)
    nests:[], // all the nests belonging to the logged in user
    freetdrafts: [], // all freetdrafts created by the logged in user
    bookmarks:[], // all the bookmarked freets which may be specific to a nest
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },

  getters:{
    getNumRefreetsOnFreet(state,freet){
      // TODO: PASS ARGS TO GETTERS BY RETURNING a functiom that can take in args
      
      return 0
    },
    getNumLikesOnFreet(state, freet){
      return 0
    },
    getNumDownFreetsOnFreet(state, freet){
      return 0
    },
    getNumBookMarksOnFreet(state, freet){
      return 0
    },
    isUserReFreetsFreet(state, freet){
      return false
    },
    isUserLikesFreet(state, freet){
    
      // console.log("in store", state.likes)
      // if (!state.likes.length){
      //   return false;
      // }
      // for (const like of state.likes){
      //   if (freet.id.toString() === like.originalFreet){
      //     return true;
      //   }
      // }
      // return false;
      //   function innerfunction(state:Object, freet:Object){
      //     console.log("store likes after liking", freet)
      //     const likesonfreet= (state.likes).filter(item => item.originalFreet === freet._id)
      //     console.log("store likes after liking", likesonfreet)
      //     const authorsOfLikesOnFreet = likesonfreet.filter(item => item.author.toString() === freet.author.toString())
      //     // console.log("authorsOfLikesOnFreet",authorsOfLikesOnFreet)
      //     return  authorsOfLikesOnFreet.includes(state.username)
    
      //   }
      // return innerfunction
      // console.log("store likes after liking", freet)
      // const likesonfreet= (state.likes).filter(item => item.originalFreet === freet._id)
      // console.log("store likes after liking", likesonfreet)
      // const authorsOfLikesOnFreet = likesonfreet.filter(item => item.author.toString() === freet.author.toString())
      // // console.log("authorsOfLikesOnFreet",authorsOfLikesOnFreet)
      // return  authorsOfLikesOnFreet.includes(state.username)
      return false;

    },
    isUserDownFreetsFreet(state, freet){
      return false
    },
    isUserBookMarksFreet(state, freet){
      return false
    }

  },
  
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      // const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const url = state.filter ? `/api/freets/?author=${state.filter}` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },

    updateFreetDrafts(state, freetdrafts) {
      /**
       * Update the stored freetdrafts to the provided freetdrafts.
       * @param freetdrafts - FreetDrafts to store
       */
      state.freetdrafts = freetdrafts;
    },
    async refreshFreetDrafts(state) {
      /**
       * Request the server for the currently available freetdrafts (by currently logged in user).
       */
      const url = '/api/freetdrafts';
      const res = await fetch(url).then(async r => r.json());
      state.freetdrafts = res;
    },
    updateReFreetFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.refreetfilter = filter;
    },
    updateReFreets(state, refreets) {
      /**
       * Update the stored refreets to the provided refreeted freets.
       * @param freets - Freets to store
       */
      state.refreets = refreets;
    },
    async refreshReFreets(state) {
      /**
       * Request the server for the currently available refreets.
       */
      // const url = state.filter ? `/api/users/${state.filter}/refreets` : '/api/refreets';
      const url = state.refreetfilter ? `/api/refreets/?author=${state.refreetfilter}` : '/api/refreets';
      const res = await fetch(url).then(async r => r.json());
      state.refreets = res;
    },
    updateDownFreetFilter(state, filter) {
      /**
       * Update the stored downfreets filter to the specified one.
       * @param filter - Username of the user to filter downfreets by
       */
      state.downfreetfilter = filter;
    },
    updateDownFreets(state, downfreets) {
      /**
       * Update the stored downfreets to the provided downfreets.
       * @param downfreets - DownFreets to store
       */
      state.downfreets = downfreets;
    },

    // TODO: CHANGE THE URL BELOW TO CORRECTLY INDICATE WHAT IS IN THE SERVER
    async refreshDownFreets(state) {
      /**
       * Request the server for the currently available downfreets.
       */
      // const url = state.downfreetfilter ? `/api/users/${state.downfreetfilter}/downfreets` : '/api/downfreets';
      const url = state.downfreetfilter ? `/api/downfreets/?author=${state.downfreetfilter}` : '/api/downfreets';
      const res = await fetch(url).then(async r => r.json());
      state.downfreets = res;
    },

    updateLikeFilter(state, filter) {
      /**
       * Update the stored likes filter to the specified one.
       * @param filter - Username of the user to filter likes by
       */
      state.likefilter = filter;
    },
    updateLikes(state, likes) {
      /**
       * Update the stored likes to the provided likes.
       * @param likes - Likes to store
       */
      state.likes = likes;
    },

    // TODO: CHANGE THE URL BELOW TO CORRECTLY INDICATE WHAT IS IN THE SERVER
    async refreshLikes(state) {
      /**
       * Request the server for the currently available likes.
       */
      // const url = state.likefilter ? `/api/users/${state.likefilter}/likes` : '/api/likes';
      const url = state.likefilter ? `/api/likes/?author=${state.likefilter}` : '/api/likes';
      const res = await fetch(url).then(async r => r.json());
      state.likes = res;
    },

    updateNestFilter(state, nestfilter) {
      /**
       * Update the stored nests filter to the specified one.
       * @param nestfilter - Nestname of the nest to filter freets by
       */
      state.nestfilter = nestfilter;
    },

    updateNests(state, nests) {
      /**
       * Update the stored nests to the provided nests.
       * @param nests - Nests to store
       */
      state.nests = nests;
    },
    async refreshNests(state) {
      /**
       * Request the server for the currently available nests.
       */
      const url = '/api/bookmarknests';
      const res = await fetch(url).then(async r => r.json());
      state.nests = res;
    },
    updateBookMarks(state, bookmarks) {
      /**
       * Update the stored bookmarks to the provided bookmarks.
       * @param bookmarks - BookMarked Freets to store
       */
      state.bookmarks = bookmarks;
    },
    async refreshBookMarks(state) {
      /**
       * Request the server for the currently available bookmarked freets.
       */
      const url = state.nestfilter ? `/api/bookmarknests?nestname=${state.nestfilter}` : '/api/bookmarks';
      const res = await fetch(url).then(async r => r.json());
      state.bookmarks = res;
    },
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;

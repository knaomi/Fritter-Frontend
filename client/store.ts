import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    refreetfilter:null, // Username to filter shown freets by (null = show all)
    downfreetfilter:null, // Username to filter shown dwonfreets by (null = show all by logged in user) 
    likefilter:null, //Username to filter shown likes by (null = show all by logged in user)
    freets: [], // All freets created in the app
    freetdrafts: [], // all freetdrafts created by the logged in user
    downfreets:[], // all the downfreets created by a specific user
    likes: [], // all the likes created by a specific user
    refreets:[], //all the refreets created by a specific user
    username: null, // Username of the logged in user
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
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
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
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
      const url = state.filter ? `/api/users/${state.filter}/refreets` : '/api/refreets';
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
      const url = state.downfreetfilter ? `/api/users/${state.downfreetfilter}/downfreets` : '/api/downfreets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
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
      const url = state.likefilter ? `/api/users/${state.likefilter}/likes` : '/api/likes';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },

  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;

<!-- Page for all bookmarked freets-->

<template>
  <main>
    <section v-if="$store.state.username">
      <!-- <header>
        <h3>Welcome @{{ $store.state.username }} to your saved freetscorner for </h3>
      </header> -->
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete freets.
        </h3>
      </article>
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing all bookmarked freets
          </h2>
        </div>
      </header>
      <section
        v-if="$store.state.bookmarks.length"
      >
        <FreetComponent
          v-for="freet in $store.state.bookmarks"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No bookmarked freets found.</h3>
      </article>
    </section>
  </main>
</template>


<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'BookMarkPage',
  components: {FreetComponent},
  mounted() {
     this.$store.commit('refreshBookMarks');
     this. actuallikedfreet()
    
  },
  methods:{
    actuallikedfreet(){
      console.log("in bookmark page", (this.$store.state.bookmarks))
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
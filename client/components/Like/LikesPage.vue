<!-- Page for all liked freets-->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }} to the home of freets that users approved/loved</h2>
      </header>
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
            Viewing all likes
            <span v-if="$store.state.likefilter">
              by @{{ $store.state.likefilter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetLikesForm
            ref="getLikesForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get likes"
          />
        </div>
      </header>
      <section
        v-if="$store.state.likes.length"
      >
        <FreetComponent
          v-for="freet in $store.state.likes"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No liked freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import GetLikesForm from '@/components/Like/GetLikesForm.vue';

export default {
  name: 'LikePage',
  components: {GetLikesForm, FreetComponent},
  mounted() {
    this.actuallikedfreet();
    this.$refs.getLikesForm.submit();
     this.$store.commit('refreshLikes');
    
  },
  methods:{
    actuallikedfreet(){
      console.log("in like page", (this.$store.state.likes))
      // console.log("on likes page convetting to frret", this.$store.getters.getFreetfromFreetId(this.$store.likes[0].originalFreet))
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
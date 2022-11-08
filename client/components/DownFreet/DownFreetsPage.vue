<!-- page that displays downfreets for the logged in user by default & one can search for the downfreets
of another user
-->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }} to the corner of disapproved freets</h2>
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
          to create, edit, and delete freets and much more.
        </h3>
      </article>
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing all downfreeted freets
            <span v-if="$store.state.downfreetfilter">
              by @{{ $store.state.downfreetfilter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetDownFreetsForm
            ref="getDownFreetsForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get downfreets"
          />
        </div>
      </header>
      <section
        v-if="$store.state.downfreets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.downfreets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No downfreetedfreets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import GetDownFreetsForm from '@/components/DownFreet/GetDownFreetsForm.vue';


export default {
  name: 'DownFreetPage',
  components: {GetDownFreetsForm, FreetComponent},
  mounted() {
    this.$refs.getDownFreetsForm.submit();
    this.$store.commit('refreshLikes');
    this.$store.commit('refreshDownFreets');


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

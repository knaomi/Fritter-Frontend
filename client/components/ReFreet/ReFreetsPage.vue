<!-- Page for all refreeted freets-->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }} to the home of freets that users wanted to reshare through refreeting</h2>
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
            Viewing all refreets
            <span v-if="$store.state.refreetfilter">
              by @{{ $store.state.refreetfilter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetReFreetsForm
            ref="getReFreetsForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get refreets"
          />
        </div>
      </header>
      <section
        v-if="$store.state.refreets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.refreets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No refreeted freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import GetReFreetsForm from '@/components/ReFreet/GetReFreetsForm.vue';


export default {
  name: 'ReFreetPage',
  components: {GetReFreetsForm, FreetComponent},
  mounted() {
    this.$refs.getReFreetsForm.submit();
    this.$store.commit('refreshReFreets');
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

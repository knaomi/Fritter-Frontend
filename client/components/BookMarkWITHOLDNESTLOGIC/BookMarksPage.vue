<!-- Contains all the nests associated with a particular user and their bookmarks.
This is the default page of bookmarks which will only display the bookmark nests-->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }} to your saved freets page</h2>
      </header>
      <CreateNestForm />
      <!-- <h3> Have fun discovering your bookmarked freets in each nest below!!! </h3> -->
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
            Viewing all bookmark nests
            <!-- <span v-if="$store.state.nestfilter">
              by @{{ $store.state.nestfilter }}
            </span> OBSOLETE FOR THIS FIRST PART--> 
            <!-- TODO: REPLACE THE COMPONENT BELOW WITH A METHOD that updates the store -->
            <!-- <GetNestsForm
            ref="getNestsForm" -->
            
          </h2>
        </div>
      </header>
      <section
        v-if="$store.state.nests.length"
      >
        <NestComponent
          v-for="nest in $store.state.nests"
          :key="nest.id"
          :nest="nest"
        />
      </section>
      <article
        v-else
      >
        <h3>No nests found.</h3>
      </article>
    </section>
    <!-- <section>
      <header>
        <div class="left">
          <h2>
            Viewing all bookmarked freets in Nest: 
            <span v-if="$store.state.nestfilter">
              by @{{ $store.state.nestfilter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetNestFreetsForm 
            ref="getNestFreetsForm"
            value="nestname"
            placeholder="🔍 Filter by nestname (optional)"
            button="🔄 Get freets in Nest"
          />
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
    </section> -->

  </main>
</template>

<script>
import NestComponent from '@/components/BookMark/NestComponent.vue';
import CreateNestForm from '@/components/BookMark/CreateNestForm.vue';
import GetNestsForm from '@/components/BookMark/GetNestsForm.vue';
import GetNestFreetsForm from '@/components/BookMark/GetNestFreetsForm.vue';
import FreetComponent from '@/components/Freet/FreetComponent.vue';


export default {
  name: 'BookMarkPage',
  components: {NestComponent, CreateNestForm, GetNestFreetsForm,
        FreetComponent, GetNestsForm},

  // computed:{
  //   getNests(){
  //     this.getNestsRequest();
  //   },
  // },

  mounted() {
    // this.$refs.getNestsForm.submit();

    // this.$refs.getNestFreetsForm.submit();
    this.$store.commit('refreshNests');
    this.nestslost();
  },
  methods:{
    async getNestsRequest() {
      const url = '/api/bookmarknests';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateNests', res);
        console.log("page updates nests well")
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    
    nestslost(){
      console.log("what happened to the nests?", this.$store.state.nests)
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

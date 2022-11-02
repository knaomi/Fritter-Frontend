<!-- Default page that also displays freets & FREETDRAFTS FOR NOW - MAY CHANGE LATER -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <header>
        <h2>Freet Draft Section</h2>
      </header>
      <CreateFreetDraftForm/>
       <header>
          <h3>
            Viewing all freetdrafts
          </h3>
        </header>
      <section
        v-if="$store.state.freetdrafts.length"
      >
        <FreetDraftComponent
          v-for="freetdraft in $store.state.freetdrafts"
          :key="freetdraft.id"
          :freetdraft="freetdraft"
        />
      </section>
      <article
        v-else
      >
        <h3>No freetdrafts found.</h3>
      </article>

<!-- BEGIN FREETS -->
      <header>  <!-- NEW -->
        <h2>Freet Section</h2>
      </header>

      <CreateFreetForm />
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
            Viewing all freets
            <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetFreetsForm
            ref="getFreetsForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get freets"
          />
        </div>
      </header>
      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';

import FreetDraftComponent from '@/components/FreetDraft/FreetDraftComponent.vue';
import CreateFreetDraftForm from '@/components/FreetDraft/CreateFreetDraftForm.vue';
import GetFreetDraftsForm from '@/components/FreetDraft/GetFreetDraftsForm.vue';


export default {
  name: 'FreetPage',
  components: {FreetComponent, GetFreetsForm, CreateFreetForm, 
              FreetDraftComponent,CreateFreetDraftForm, GetFreetDraftsForm},
  mounted() {
    this.$refs.getFreetsForm.submit();
    this.$refs.GetFreetDraftsForm.submit();
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

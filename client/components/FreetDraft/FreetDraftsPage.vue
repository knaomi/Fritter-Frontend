<!-- Default page that also displays freets-->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }} to the place where you organise your thoughts</h2>
      </header>
      <CreateFreetDraftForm />
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
            Viewing all freetdrafts
            <!-- <span v-if="$store.state.username">
              by @{{ $store.state.username }}
            </span> -->
            <GetFreetDraftsForm
                ref="getFreetDraftsForm"
            />
          </h2>
        </div>
        <!-- <div class="right">
          <GetFreetDraftsForm
            ref="getFreetsForm"
            value="author"
            placeholder="🔍 Filter by author (optional)"
            button="🔄 Get freets"
          />
        </div> -->
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
    </section>
  </main>
</template>

<script>

import FreetDraftComponent from '@/components/FreetDraft/FreetDraftComponent.vue';
import CreateFreetDraftForm from '@/components/FreetDraft/CreateFreetDraftForm.vue';
import GetFreetDraftsForm from '@/components/FreetDraft/GetFreetDraftsForm.vue';


export default {
  name: 'FreetDraftPage',
  components: {FreetDraftComponent,CreateFreetDraftForm, GetFreetDraftsForm},
  mounted() {
    this.$refs.GetFreetDraftsForm.submit();
    // this.GetFreetDraftsForm.submit(); // No need to uniquely identify it since you only want to make sure
    // that the store has the correct freetdrafts everytime the page is referenced
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

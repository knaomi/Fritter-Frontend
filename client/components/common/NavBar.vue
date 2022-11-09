<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <img src="../../public/logo.svg">
      <h1 class="title">
        Fritter
      </h1>
    </div>

    <div class="middle">
    <menu> 
      <li> 
        <router-link to="/refreets">
          <button>ReFreets </button>
        </router-link>
      </li>

      <li>
        <router-link to="/likes">
          <button> Likes </button>
        </router-link>
      </li>
      <li>
        <router-link to="/downfreets">
          <button>DownFreets</button>
        </router-link>
      </li>
  
      <!-- <li>
        <router-link to="/bookmarks">
          BookMarks
        </router-link>
      </li> -->

      <li>
        <router-link to="/freetdrafts">
          <button> FreetDrafts </button>
        </router-link>
      </li>
    </menu>
    </div>

    <div class="right">
      <router-link to="/">
        <button> Home </button> 
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/account"
      >
       <button>  Account </button> 
      </router-link>
      <router-link
        v-else
        to="/login"
      >
        Login
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    padding: 1vw 2vw;
    /* background-color: #ccc; */
    background-color:peachpuff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}
.middle menu {
	/* display: flex; */
  list-style-type:none;
  display: flex;
	align-items: center;
  gap: 14px;
  font-size: 30px;
}

.right {
    font-size: 25px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}
</style>

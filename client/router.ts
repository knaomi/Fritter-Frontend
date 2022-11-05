import Vue from 'vue';
import VueRouter from 'vue-router';
import FreetsPage from './components/Freet/FreetsPage.vue';
import DownFreetsPage from './components/DownFreet/DownFreetsPage.vue';
import LikesPage from './components/Like/LikesPage.vue';
import ReFreetsPage from './components/ReFreet/ReFreetsPage.vue'
import BookMarksPage from './components/BookMark/BookMarksPage.vue';
import FreetDraftsPage from './components/FreetDraft/FreetDraftsPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: FreetsPage},
  {path: '/downfreets', name: 'DownFreets', component: DownFreetsPage},
  {path: '/likes', name: 'Likes', component: LikesPage},
  {path: '/refreets', name: 'ReFreets', component: ReFreetsPage},
  {path: '/bookmarks', name: 'BookMarks', component: BookMarksPage},
  {path: '/freetdrafts', name: 'FreetDrafts', component: FreetDraftsPage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
    if (to.name === 'DownFreets' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to DownFreets and are not signed in
      return;
    }
    if (to.name === 'Likes' &&!router.app.$store.state.username){
      next({name: 'Login'}); // Go to Login page if user navigates to Likes and are not signed in
      return;     
    }
    if (to.name === 'ReFreets' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to ReFreets and are not signed in
      return;
    }
    if (to.name === 'BookMarks' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to BookMarks and are not signed in
      return;
    }
    if (to.name === 'FreetDrafts' && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to FreetDrafts and are not signed in
      return;
    }
  }

  next();
});

export default router;

<template>
  <nav class="navbar navbar-expand-lg navbar-dark  px-2  flex-column">
    
 <!-- //NOTE - uncomment below to show drop down of medium size screen -->
    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> -->
    
    
    <div class=" collapse navbar-collapse" id="navbarText">
      
      <!-- LOGIN COMPONENT HERE -->
      <Login />
      
    </div>


      <!-- NOTE create event button here -->
 
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <p>Home</p>
      </div>
    </router-link>

    <div>
    <button class="rounded bg-success p-3" v-if="user.id" data-bs-toggle="modal" data-bs-target="#createEvent">Create Event</button>
    </div>

    <router-link class="navbar-brand d-flex" :to="{ name: 'Account' }">
      <div class="d-flex flex-column align-items-center">
        <p>Account</p>
      </div>
    </router-link> 

 
  </nav>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import Login from './Login.vue';
export default {
  setup() {
    return {

      user: computed(()=>AppState.user)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>

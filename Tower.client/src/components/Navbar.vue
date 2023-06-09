<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    
    <!-- <div class="d-flex"> -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <!-- <div class="d-flex "> -->
    <div class=" collapse navbar-collapse" id="navbarText">
      
      <!-- LOGIN COMPONENT HERE -->
      <Login />
      
    </div>

    <!-- <div class="d-flex flex-column"> -->

      <!-- NOTE create event button here -->
      <!-- <div> -->
        
    <section class="row">
      <div class="col-10">

      
    <!-- <div> -->
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <p>Home</p>
      </div>
    </router-link>
  <!-- </div> -->

  <!-- <div> -->
    <router-link class="navbar-brand d-flex" :to="{ name: 'Account' }">
      <div class="d-flex flex-column align-items-center">
        <p>Account</p>
      </div>
    </router-link> 

  </div>
  </section>
  <!-- </div> -->
  <!-- </div> -->
<!-- </div> -->
<!-- </div> -->
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

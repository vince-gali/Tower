<template>
  <header class="">
    <!-- <div class="header-img">
      <img src="" alt="">
    </div> -->
    
  </header>

  <main class="bg-dark">

    

    <div class="d-flex">
    <div class="col-10">
    <img class=" py-3 ps-3 header-img" src="./assets/img/header-img.png" alt="">
    
    <!-- <div>
    <button v-if="user.id" data-bs-toggle="modal" data-bs-target="#createEvent">Create Event</button>
    </div> -->

      <router-view />
    </div>
    <div class="col-2 bg-secondary">
    <Navbar />
    </div>
  </div>
  </main>

    

  <Modal id="createEvent">
      <CreateEventForm/>
    </Modal>

  

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      user: computed(()=> AppState.user)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

// .header-img{
//   : url('./assets/img/header-img.png');
// }

.header-img{
  // background-image: url('./assets/img/header-img.png');
  width: 175px;
  // height: 50px;
  // aspect-ratio: 1/1;

  
}

</style>

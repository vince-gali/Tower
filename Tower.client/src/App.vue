<template>
  <header>
    <!-- <div class="header-img">
      <img src="" alt="">
    </div> -->
  </header>

  <main>

    

    <div class="d-flex">
    <div class="col-10">
    <h1 class="header-img">TOWER</h1>
    <!-- <div class="header-img"></div> -->
    <img src="" alt="">
    <div>
    <button v-if="user.id" data-bs-toggle="modal" data-bs-target="#createEvent">Create Event</button>
    </div>

      <router-view />
    </div>
    <div class="col-2 bg-dark">
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
  background-image: url('./assets/img/header-img.png');
  width: 25px;
  height: 50px;

  
}

</style>

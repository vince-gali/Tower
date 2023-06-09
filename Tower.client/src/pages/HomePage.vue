<template>

  <div class="container-fluid">
  <section class="row">
    <!-- // TODO cover img here -->
  </section>

  <section class="row justify-content-center bg-dark py-3">
    <div class="">
      <div class="d-flex justify-content-around rounded">
        <button @click="filterBy='' " class="btn btn-outline-light">All</button>
        <button @click="filterBy='expo' " class="btn btn-outline-light">Expos</button>
        <button @click="filterBy='convention' " class="btn btn-outline-light">Conventions</button>
        <button @click="filterBy='exhibit' " class="btn btn-outline-light">Exhibits</button>
        <button @click="filterBy='sport' " class="btn btn-outline-light">Sports</button>
        <button @click="filterBy='digital' " class="btn btn-outline-light">Digital</button>
        <button @click="filterBy='concert' " class="btn btn-outline-light">Concerts</button>

      </div>
    </div>
  </section>

  <!-- //NOTE - events here -->
  <section class="row">
    <div class="col-md-3" v-for="e in events" :key="e.id"> 
      <!-- // NOTE - events card template here -->
      <EventCard :eventProp="e" />
    </div>
  </section>
</div>

</template>

<script>
import { computed } from '@vue/reactivity';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import { onMounted, ref } from 'vue';
// import { type } from 'os';

export default {
  setup() {

    const filterBy = ref('')
    
    async function getEvents(){
      try {
        logger.log('getting events')
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(()=> {
      getEvents()
    })

    return {

      filterBy,
      events: computed(()=> {
        if(filterBy.value ==""){
          return AppState.events
        } else {
          return AppState.events.filter(e => e.type == filterBy.value)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>

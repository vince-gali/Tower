<template>
  <!-- <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->
  <section class="row">
    <div>
      <p>My Events</p>
    </div>
    <div class="col-md-3" v-for="t in myTickets" :key="t.id">
      <EventCard :eventProp="t"/>
      <!-- {{ t.name }} -->
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
export default {
  setup() {

    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error('error')
      }
    }

    onMounted(()=>{
      getEvents()
    })
    return {
      myTickets: computed(()=> AppState.myTickets),
      account: computed(() => AppState.account),
      events: computed(()=> AppState.events)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

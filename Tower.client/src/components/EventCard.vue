<template>

<!-- //NOTE - below is for the account page -->
<div v-if="eventProp.event">
<router-link :to=" {name: 'EventDetails', params: {id: eventProp?.event?.id}}">
    <div class="card">
        <img class="container-fluid" :src="eventProp?.event.coverImg" alt="">
            <div>
                <h4>{{ eventProp?.event.name }}</h4>
                <p>{{eventProp?.event.location}}</p>
                <p>Start Date: {{eventProp?.event.startDate}}</p>
                <p>Capacity: {{eventProp?.event.capacity}}</p>
            </div>
            <!-- <div>
                <button @click="deleteEvent(eventProp?.id)" v-if="eventProp?.event.creatorId == account?.id"><i class="mdi mdi-pencil"></i> Delete</button>
            </div> -->
    </div>
</router-link>
</div>

<!-- //NOTE - below is for the home page -->
<div v-else>
<router-link :to=" {name: 'EventDetails', params: {id: eventProp?.id}}">
    <div class="card">
        <img class="container-fluid" :src="eventProp?.coverImg" alt="">
            <div>
                <h4>{{ eventProp?.name }}</h4>
                <p>{{eventProp?.location}}</p>
                <p>Start Date: {{eventProp?.startDate}}</p>
                <p>Capacity: {{eventProp?.capacity}}</p>
            </div>
        </div>
    </router-link>
    <div>
        <button @click="deleteEvent(eventProp?.id)" v-if="eventProp?.creatorId == account?.id"><i class="mdi mdi-pencil"></i> Delete</button>
    </div>
</div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { Event } from '../models/Event.js';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {

    props: {
            eventProp: {type: Event, required:true}
        }, 

    setup(){
        

        return {

            async deleteEvent(eventId){
                try {
                    await eventsService.deleteEvent(eventId)
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            },

            account: computed(()=> AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>
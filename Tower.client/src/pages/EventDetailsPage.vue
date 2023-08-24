<template>

    <!-- //NOTE - main event info here -->
    <section class="row">
        <div class="container-fluid">
            <div class="col-11 bg-dark">
                <div class="card rounded">
                    <div class="">
                    <img class="img-fluid event-img" :src="event?.coverImg" alt="">
                    </div>
                    <div>
                        <p class="text-dark">{{ event?.name }}</p>
                        <p class="text-dark">{{ event?.location }}</p>
                        <p class="text-dark">{{ event?.description }}</p>
                        <!-- <p class="text-dark">{{ event?.capacity }} Spots Left</p>
                        <p> {{ event?.ticketCount }} People Going</p> -->

                        <p> {{ event?.capacity - event?.ticketCount }}  Spots Remaining</p>

                        <p >{{ event?.startDate }}</p>

                        <!-- <button v-if="!isAttending" @click="attendEvent()">Attend</button> -->

                        <button  :disabled="event?.capacity==event?.ticketCount" v-if="!isAttending && event?.isCanceled == false" 
                        @click="attendEvent()">Attend</button>

                        <h3 v-if="event?.capacity == event?.ticketCount">Sorry this event is sold out!</h3>

                        <h3 v-if="event?.isCanceled == true">Sorry this event has been cancelled</h3>

                        <!-- <button :disabled="isAttending" v-if="isAttending">Already going</button> -->
                        
                        <button @click="leaveEvent()" v-if="isAttending">Leave Event</button>

                        


                        <button @click="deleteEvent(eventProp?.id)" v-if="eventProp?.creatorId == account?.id"><i class="mdi mdi-pencil"></i> Delete</button>

                    </div>
                
                    
                
                  
                    
                </div>
            </div>
        </div>
    </section>

    <!-- //NOTE - attendees here -->
    
        <!-- <div class="col-md-10"> -->
            <div class="py-5">
                <h5>See who else is attending...</h5>
        <div class="card col-10">
            <div class="py-3">
                <img class="attendee rounded" v-for="t in tickets"  :key="t.id" :src="t.profile.picture" alt="">
                <p  v-for="t in tickets">{{ t.profile.name }}</p>
                
                <!-- <h5>{{ t.name }}</h5> -->
            </div>
        </div>
    </div>

        <!-- </div> -->
    

    <!-- //NOTE - comments here -->
    <section class="row">
        
        <div class="col-8">
            <Comment/>
        </div>
        
        
        <div v-for="c in comments" :key="c.id">
            <!-- <p>{{ c }}</p> -->
            <CommentCard :commentProp="c" />
        </div>

    </section>
   
</template>


<script>
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { commentsService } from '../services/CommentsService.js';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { computed } from '@vue/reactivity';
import {AppState} from '../AppState.js'
import { onMounted } from 'vue';

export default {
    setup(){
        const route = useRoute()

        async function getEventById(){
            try {
                const eventId = route.params.id
                await eventsService.getEventById(eventId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        async function getCommentsByEventId(){
            try {
                const eventId = route.params.id
                await commentsService.getCommentsByEventId(eventId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        async function getTicketsByEventId(){
            try {
                const eventId = route.params.id
                await ticketsService.getTicketsByEventId(eventId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }

        async function getCommentsByEventId(){
            try {
                const eventId = route.params.id
                await commentsService.getCommentsByEventId(eventId)
            } catch (error) {
                logger.error(error)
                Pop.toast(error.message, 'error')
            }
        }
        

        onMounted(()=>{
            getEventById()
            getCommentsByEventId()
            getTicketsByEventId()
        })

        return {
            event: computed(()=> AppState.activeEvent),
            comments: computed(()=> AppState.comments),
            tickets: computed(()=> AppState.tickets),
            user: computed(()=> AppState.user),
            isAttending: computed(()=> AppState.tickets.find(t => t.accountId == AppState.user.id)),
            // isCanceled: computed(()=> AppState.isCanceled),

            async attendEvent(){
                try {
                    const eventId = route.params.id
                    await ticketsService.attendEvent(eventId)
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            },

            async leaveEvent(){
                try {
                    if(await Pop.confirm){
                        const ticket = AppState.tickets.find(t => t.accountId == AppState.account.id)
                        await ticketsService.leaveEvent(ticket.id)
                    }
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

.event-img{
    height: 45vh;
    object-fit: cover;
    box-shadow: 2px 2px white;
    aspect-ratio: 1/1;
}

.attendee{
    height: 10vh;
    aspect-ratio: 1/1;
    
}

</style>
<template>


  
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title" id="exampleModalLabel">Create Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createEvent()" >
            <div class="modal-body">
                <div class="form-floating mb-3">
                    <label for="floatingInput">Event Title</label>
                    <input type="text" class="form-control" id="floatingInput" placeholder="Event Title" v-model="editable.name">
                </div>

                <div class="form-floating">
                    <input id="floatingPassword" class="form-control" type="text" name="" placeholder="Cover Image" v-model="editable.coverImg">
                    <label for="floatingPassword">Cover Image</label>
                </div>

                <div class="form-floating">
                    <input id="capacity" class="form-control" type="number" name="" placeholder="Capacity" v-model="editable.capacity">
                    <label for="capacity">Capacity</label>
                </div>

                <div class="form-floating">
                    <input id="location" class="form-control" type="text" name="" placeholder="Location" v-model="editable.location">
                    <label for="location">Location</label>
                </div>

                <div class="form-floating">
                    <input id="description" class="form-control" type="text" name="" placeholder="Description" v-model="editable.description">
                    <label for="description">Description</label>
                </div>

                <!-- <div class="form-floating">
                    <input id="date" class="form-control" type="text" name="" placeholder="Date" v-model="editable.startDate">
                    <label for="date">Date</label>
                </div> -->

                <div class="">
                    <input class="form-control" type="date" >
                </div>
                
                <div>
                    <select name="type" id="type" v-model="editable.type">
                        <option value="concert">Concerts</option>
                        <option value="convention">Conventions</option>
                        <option value="sport">Sports</option>
                        <option value="digital">Digital</option>
                    </select>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Submit Event</button>
            </div>

        </form>


    </div>



</template>


<script>
import { Modal } from 'bootstrap';
import { eventsService } from '../services/EventsService.js';
import { router } from '../router.js';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup(){
        const editable = ref({})
        const router = useRouter()
        return {
            editable,

            async createEvent(){
                try {
                    const formData = editable.value
                    const newEvent = await eventsService.createEvent(formData)
                    Modal.getOrCreateInstance('#createEvent').hide()
                    editable.value = {}
                    router.push({name: 'EventDetails', params: {id: newEvent.id}})
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>
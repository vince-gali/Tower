<template>

<div class="card p-2">
<div class="modal-content">
    <form @submit.prevent="createComment()">
        <div class="modal-body">
            <div class="form-floating">
                <input required class="form-control" v-model="editable.body" type="text">
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary py-2" type="submit">Post Comment</button>
            </div>

        </div>
    </form>
</div>
</div>


<!-- <div v-for="c in comments" :key="c.id">
    <CommentCard/>
</div> -->
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    
    setup(){
        const editable = ref({})
        const route = useRoute()
        return {
            editable, 
            
            async createComment(){
                try {
                    const formData = editable.value
                    // TODO assign the formData's eventId
                    formData.eventId = route.params.id
                    await commentsService.createComment(formData)
                    editable.value={}
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>
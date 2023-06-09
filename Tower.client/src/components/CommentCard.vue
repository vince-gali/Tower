<template>
    <div class="card bg-white col-8">

    
    <div class="py-2">
        <!-- <h5>{{ profile?.name }}</h5> -->
        <img class="img-fluid" :src="commentProp.creator?.picture" alt="">
        <h5>{{ commentProp.creator?.name }}</h5>
        <h5>{{ commentProp?.body }}</h5>
    </div>
    <div>
        <button @click="deleteComment(commentProp?.id)" v-if="commentProp?.creatorId == account?.id"><i class="mdi mdi-pencil"></i> Delete</button>
    </div>
</div>

<div>

</div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { Comment } from '../models/Comment.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {

    props: {
        commentProp: {type: Comment, required: true}
    },
    setup(){
        return {

            async deleteComment(commentId){
                try {
                    await commentsService.deleteComment(commentId)
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
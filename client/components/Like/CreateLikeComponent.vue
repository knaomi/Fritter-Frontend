<template>
    <div
        v-if="!isUserLikesFreet( freet.id)"
        class="notliking"
        >
            <button 
            @click="addLike">
                🤍Add Like
            </button>
    </div>
   <p
      v-else
      class="liking"
    >
        <button 
        @click="deleteLike">
            ❤️  Like
        </button>
    </p>
</template>

<script>
export default {
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },

// TODO: IMPLEMEMT THE METHODS BELOW AND MAKE SURE THAT THE FREET IS UPDATED EFFECTIVELY
  methods:{
    isUserLikesFreet(){
        /**
         * Checks if user already likes freet.
         * @returns boolean
         */
        // TODO: IMPLEMENT THIS
        return true
    },
    addLike(){
    /**
     * Creates a new like for the freet by the logged in user
     */
    },

    deleteLike(){

    }
  }


}
</script>

<style>

.liking button{
    background-color: lightblue;
}

</style>

<!-- Reusable component representing a single refreet and its actions -->

<template>
    <div
        v-if="!isUserReFreetsFreet()"
        class="notrefreeting"
        >
            <button 
            @click="AddReFreet">
               ⤵️ReFreet
            </button>
    </div>
   <p
      v-else
      class="refreeting"
    >
        <button 
        @click="deleteReFreet">
            ⤵️ReFreet
        </button>
    </p>
</template>

<script>
export default {
  name: 'CreateReFreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },

// TODO: IMPLEMEMT THE METHODS BELOW AND MAKE SURE THAT THE FREET IS UPDATED EFFECTIVELY
  methods:{
    isUserReFreetsFreet(){
        /**
         * Checks if user already refreets freet.
         * @returns boolean
         */
        // TODO: IMPLEMENT THIS
        return true
    },
    addReFreet(){
    /**
     * Creates a new refreet for the freet by the logged in user
     */
    },

    deleteReFreet(){

    }
  }


}
</script>

<style>

.refreeting button{
    background-color: lightblue;
}

</style>

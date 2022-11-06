<!-- Reusable component representing a single downfreet and its actions -->

<template>
    <div
        v-if="!isUserDownFreetsFreet()"
        class="notdownfreeting"
        >
            <button 
            @click="addDownFreet">
               ⤵️DownFreet
            </button>
    </div>
   <p
      v-else
      class="downfreeting"
    >
        <button 
        @click="deleteDownFreet">
            ⤵️DownFreet
        </button>
    </p>
</template>

<script>
export default {
  name: 'CreateDownFreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },

// TODO: IMPLEMEMT THE METHODS BELOW AND MAKE SURE THAT THE FREET IS UPDATED EFFECTIVELY
// TODO UNCOMMENT OUT THE CODE IN ROUTER THAT REMOVES LIKE BEFORE DOWNFREETING
  methods:{
    isUserDownFreetsFreet(){
        /**
         * Checks if user already downfreets freet.
         * @returns boolean
         */
        // TODO: IMPLEMENT THIS
        return false
    },
    addDownFreet(){
    /**
     * Creates a new downfreet for the freet by the logged in user
     */
    },

    deleteDownFreet(){

    }
  }


}
</script>

<style>

.downfreeting button{
    background-color: lightblue;
}

</style>

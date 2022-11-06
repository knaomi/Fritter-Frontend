<template>
    <div
        v-if="!isUserBookMarksFreet()"
        class="notbookmarking"
        >
            <button 
            @click="addBookMark">
                <!-- 🔖📂AddBookMark -->
                AddBookMark
            </button>
    </div>
   <p
      v-else
      class="bookmarking"
    >
        <button 
        @click="deleteBookMark">
            <!-- 📁🗂📌BookMark -->
            BookMark
        </button>
    </p>
</template>

<script>
export default {
  name:'CreateBookMarkComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },

// TODO: IMPLEMEMT THE METHODS BELOW AND MAKE SURE THAT THE FREET IS UPDATED EFFECTIVELY
  methods:{
    isUserBookMarksFreet(){
        /**
         * Checks if user already bookmarks freet.
         * @returns boolean
         */
        // TODO: IMPLEMENT THIS
        return true
    },
    addBookMark(){
    /**
     * Creates a new bookmark for the freet by the logged in user
     */
    },

    deleteBookMark(){

    }
  }


}
</script>

<style>

.bookmarking button{
    background-color: lightblue;
}

</style>


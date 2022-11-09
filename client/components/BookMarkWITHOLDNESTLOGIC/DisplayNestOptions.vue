<template>
    <div class="nestoption">
        {{nestname}}
        <button v-on:click="choosenest">Select</button>

    </div>
  
</template>


<script>

export default {
    name:'DisplayNestOptions',
    props: ['nestname'],
    methods:{
        choosenest(){
            this.$emit('picknest', this.nestname)
        }
    },
}
</script>

<style scoped>
.nestoption{
    background: yellow;
}

</style>

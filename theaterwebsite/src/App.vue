<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: "App",
  components:{
  },
  created(){
  }
};
</script>

<style lang="sass">
// ~從node_modules找bootstrap
@import "~bootstrap/scss/bootstrap"
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin: 0
  padding: 0
  // margin-top: 60px
  width: 100%
  height: 100%
html,body
  height: 100%
  margin: 0
  padding: 0
</style>
